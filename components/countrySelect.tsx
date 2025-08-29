// components/CountrySelect.tsx
"use client";

import * as React from "react";
import {
  useMemo,
  useState,
  useCallback,
  useRef,
  useEffect,
  useDeferredValue,
} from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Country, CountryData } from "@/public/country";
import { FixedSizeList } from "react-window";


interface CountryOption {
  value: string;
  label: string;
  callCode: string;
  id: string;
}

interface CountrySelectProps {
  value: string | null;
  onChange: (selectedOption: CountryOption | null) => void;
}

const ITEM_HEIGHT = 40; // Approximate height of each CommandItem for FixedSizeList
const MAX_LIST_HEIGHT = 300; // Max height for the virtualized list

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const deferredSearchValue = useDeferredValue(searchValue);

  const countryOptions: CountryOption[] = useMemo(() => {
    return Country.map((country: CountryData) => ({
      value: country.name,
      label: `${country.name} (+${country.callingCode})`,
      id: country.id,
      callCode: country.callingCode,
    }));
  }, []);

  const countryMap = useMemo(() => {
    return new Map(countryOptions.map((option) => [option.value, option]));
  }, [countryOptions]);

  const selectedOptionLabel = useMemo(() => {
    return value
      ? countryMap.get(value)?.label || "Select Country..."
      : "Select Country...";
  }, [value, countryMap]);

  const handleSelect = useCallback(
    (currentValue: string) => {
      const newSelectedOption = countryMap.get(currentValue) || null;
      onChange(newSelectedOption);
      setOpen(false);
      setSearchValue("");
    },
    [onChange, countryMap]
  );

  const filteredOptions = useMemo(() => {
    if (!deferredSearchValue) {
      return countryOptions;
    }
    const lowerCaseSearch = deferredSearchValue.toLowerCase();
    const filtered = countryOptions.filter(
      (option) =>
        option.label.toLowerCase().includes(lowerCaseSearch) ||
        option.value.toLowerCase().includes(lowerCaseSearch)
    );
    return filtered;
  }, [countryOptions, deferredSearchValue]);

  const listRef = useRef<FixedSizeList>(null);

  useEffect(() => {
    if (open && listRef.current && value && filteredOptions.length > 0) {
      const selectedIndex = filteredOptions.findIndex(
        (option) => option.value === value
      );

      if (selectedIndex !== -1) {
        requestAnimationFrame(() => {
          listRef.current?.scrollToItem(selectedIndex, "center");
        });
      }
    }
  }, [open, value, filteredOptions]);

  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const option = filteredOptions[index];

      if (!option) {
        return null;
      }
 const isSelected = value === option.value;
      return (
        <CommandItem
          key={option.id}
          value={option.value}
          onSelect={() => handleSelect(option.value)}
          style={style}
           className={cn(
            "flex items-center",
            isSelected ? "bg-accent text-accent-foreground" : ""
          )}
        >
          <Check
            className={cn(
              "mr-2 h-4 w-4",
              value === option.value ? "opacity-100" : "opacity-0"
            )}
          />
          {option.label}
        </CommandItem>
      );
    },
    [filteredOptions, handleSelect, value]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between",
            !value && "text-muted-foreground" // This is the new line
          )}
        >
          {selectedOptionLabel}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
      >
        <Command>
          <CommandInput
            placeholder="Search country..."
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            {filteredOptions.length === 0 ? (
              <CommandEmpty className="py-6 text-center text-sm">
                No country found.
              </CommandEmpty>
            ) : (
              <CommandGroup>
                <FixedSizeList
                  height={Math.min(filteredOptions.length * ITEM_HEIGHT, MAX_LIST_HEIGHT)}
                  itemCount={filteredOptions.length}
                  itemSize={ITEM_HEIGHT}
                  width="100%"
                  ref={listRef}
                >
                  {Row}
                </FixedSizeList>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CountrySelect;