import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
      <Card>
         <CardContent className="pt-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
               <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                     id="firstName"
                     placeholder="Filter by first name"
                     value={firstName}
                     onChange={(e) => onFirstNameChange(e.target.value)}
                     className="h-11"
                  />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                     id="lastName"
                     placeholder="Filter by last name"
                     value={lastName}
                     onChange={(e) => onLastNameChange(e.target.value)}
                     className="h-11"
                  />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="yearLevel">Year Level</Label>
                  <Input
                     id="yearLevel"
                     type="number"
                     min="1"
                     max="4"
                     placeholder="1-4"
                     value={yearLevel}
                     onChange={(e) => onYearLevelChange(e.target.value)}
                     className="h-11"
                  />
               </div>
               <div className="flex items-end sm:col-span-2 md:col-span-1">
                  <Button
                     variant="outline"
                     onClick={onClear}
                     className="w-full h-11"
                  >
                     Clear Filters
                  </Button>
               </div>
            </div>
         </CardContent>
      </Card>
   );
}
