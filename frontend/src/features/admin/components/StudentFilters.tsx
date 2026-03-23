import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { HiMagnifyingGlass, HiXMark } from 'react-icons/hi2';

interface StudentFiltersProps {
   firstName: string;
   lastName: string;
   yearLevel: string;
   onFirstNameChange: (value: string) => void;
   onLastNameChange: (value: string) => void;
   onYearLevelChange: (value: string) => void;
   onClear: () => void;
}

export default function StudentFilters({
   firstName,
   lastName,
   yearLevel,
   onFirstNameChange,
   onLastNameChange,
   onYearLevelChange,
   onClear,
}: StudentFiltersProps) {
   return (
      <Card className="bg-gradient-to-br from-card to-muted/20">
         <CardContent className="pt-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
               <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                  <div className="relative">
                     <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                     <Input
                        id="firstName"
                        placeholder="Search first name"
                        value={firstName}
                        onChange={(e) => onFirstNameChange(e.target.value)}
                        className="h-11 pl-9 pr-9 rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-primary/20"
                     />
                     {firstName && (
                        <button
                           onClick={() => onFirstNameChange('')}
                           className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                           type="button"
                        >
                           <HiXMark className="h-4 w-4" />
                        </button>
                     )}
                  </div>
               </div>
               <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                  <div className="relative">
                     <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                     <Input
                        id="lastName"
                        placeholder="Search last name"
                        value={lastName}
                        onChange={(e) => onLastNameChange(e.target.value)}
                        className="h-11 pl-9 pr-9 rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-primary/20"
                     />
                     {lastName && (
                        <button
                           onClick={() => onLastNameChange('')}
                           className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                           type="button"
                        >
                           <HiXMark className="h-4 w-4" />
                        </button>
                     )}
                  </div>
               </div>
               <div className="space-y-2">
                  <Label htmlFor="yearLevel" className="text-sm font-medium">Year Level</Label>
                  <div className="relative">
                     <Input
                        id="yearLevel"
                        type="number"
                        min="1"
                        max="4"
                        placeholder="1-4"
                        value={yearLevel}
                        onChange={(e) => onYearLevelChange(e.target.value)}
                        className="h-11 pr-9 rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-primary/20"
                     />
                     {yearLevel && (
                        <button
                           onClick={() => onYearLevelChange('')}
                           className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                           type="button"
                        >
                           <HiXMark className="h-4 w-4" />
                        </button>
                     )}
                  </div>
               </div>
               <div className="flex items-end sm:col-span-2 md:col-span-1">
                  <Button
                     variant="outline"
                     onClick={onClear}
                     className="w-full h-11 rounded-lg border-2 hover:bg-primary/10 hover:text-primary hover:border-primary transition-all"
                  >
                     Clear Filters
                  </Button>
               </div>
            </div>
         </CardContent>
      </Card>
   );
}
