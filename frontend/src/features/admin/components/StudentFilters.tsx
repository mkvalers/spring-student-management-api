import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { HiMagnifyingGlass, HiXMark, HiAdjustmentsHorizontal } from 'react-icons/hi2';
import { useState } from 'react';

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
   const [isOpen, setIsOpen] = useState(false);
   const hasActiveFilters = firstName || lastName || yearLevel;

   return (
      <>
         {/* Mobile Toggle Button */}
         <div className="md:hidden">
            <Button
               variant="outline"
               onClick={() => setIsOpen(!isOpen)}
               className="w-full h-10 rounded-lg border-2 hover:bg-primary/10 hover:text-primary hover:border-primary transition-all flex items-center justify-center gap-2"
            >
               <HiAdjustmentsHorizontal className="h-5 w-5" />
               Filters
               {hasActiveFilters && (
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                     {[firstName, lastName, yearLevel].filter(Boolean).length}
                  </span>
               )}
            </Button>
         </div>

         {/* Filters Card */}
         <Card className={`bg-gradient-to-br from-card to-muted/20 ${isOpen ? 'block' : 'hidden'} md:block`}>
            <CardContent className="pt-4 pb-4">
               <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
                  <div className="space-y-1.5">
                     <Label htmlFor="firstName" className="text-xs font-medium">First Name</Label>
                     <div className="relative">
                        <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                           id="firstName"
                           placeholder="Search"
                           value={firstName}
                           onChange={(e) => onFirstNameChange(e.target.value)}
                           className="h-9 pl-9 pr-9 rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-primary/20"
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
                  <div className="space-y-1.5">
                     <Label htmlFor="lastName" className="text-xs font-medium">Last Name</Label>
                     <div className="relative">
                        <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                           id="lastName"
                           placeholder="Search"
                           value={lastName}
                           onChange={(e) => onLastNameChange(e.target.value)}
                           className="h-9 pl-9 pr-9 rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-primary/20"
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
                  <div className="space-y-1.5">
                     <Label htmlFor="yearLevel" className="text-xs font-medium">Year Level</Label>
                     <div className="relative">
                        <Input
                           id="yearLevel"
                           type="number"
                           min="1"
                           max="4"
                           placeholder="1-4"
                           value={yearLevel}
                           onChange={(e) => onYearLevelChange(e.target.value)}
                           className="h-9 px-3 pr-9 rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-primary/20"
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
                        onClick={() => {
                           onClear();
                           setIsOpen(false);
                        }}
                        className="w-full h-9 rounded-lg border-2 hover:bg-primary/10 hover:text-primary hover:border-primary transition-all"
                     >
                        Clear
                     </Button>
                  </div>
               </div>
            </CardContent>
         </Card>
      </>
   );
}
