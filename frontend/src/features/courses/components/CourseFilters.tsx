import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { HiMagnifyingGlass, HiXMark, HiAdjustmentsHorizontal } from 'react-icons/hi2';
import { useState } from 'react';

interface CourseFiltersProps {
   searchTerm: string;
   category: string;
   onSearchChange: (value: string) => void;
   onCategoryChange: (value: string) => void;
   onClear: () => void;
}

export default function CourseFilters({
   searchTerm,
   category,
   onSearchChange,
   onCategoryChange,
   onClear,
}: CourseFiltersProps) {
   const [isOpen, setIsOpen] = useState(false);
   const hasActiveFilters = searchTerm || category;

   const categories = [
      { value: '', label: 'All Categories' },
      { value: 'CS', label: 'Computer Science' },
      { value: 'MATH', label: 'Mathematics' },
      { value: 'CHEM', label: 'Chemistry' },
      { value: 'BIO', label: 'Biology' },
      { value: 'PHYS', label: 'Physics' },
      { value: 'ENG', label: 'English' },
      { value: 'HIST', label: 'History' },
   ];

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
                     {[searchTerm, category].filter(Boolean).length}
                  </span>
               )}
            </Button>
         </div>

         {/* Filters Card */}
         <Card className={`bg-gradient-to-br from-card to-muted/20 ${isOpen ? 'block' : 'hidden'} md:block`}>
            <CardContent className="pt-4 pb-4">
               <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                  <div className="space-y-1.5">
                     <Label htmlFor="searchTerm" className="text-xs font-medium">Search</Label>
                     <div className="relative">
                        <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                           id="searchTerm"
                           placeholder="Course name or code"
                           value={searchTerm}
                           onChange={(e) => onSearchChange(e.target.value)}
                           className="h-9 pl-9 pr-9 rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-primary/20"
                        />
                        {searchTerm && (
                           <button
                              onClick={() => onSearchChange('')}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                              type="button"
                           >
                              <HiXMark className="h-4 w-4" />
                           </button>
                        )}
                     </div>
                  </div>
                  <div className="space-y-1.5">
                     <Label htmlFor="category" className="text-xs font-medium">Category</Label>
                     <select
                        id="category"
                        value={category}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                     >
                        {categories.map((cat) => (
                           <option key={cat.value} value={cat.value}>
                              {cat.label}
                           </option>
                        ))}
                     </select>
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
