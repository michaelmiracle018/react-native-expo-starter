/* eslint-disable react/display-name */
import * as React from "react";
import { ListRenderItemInfo, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetFlatList,
  BottomSheetHeader,
  BottomSheetOpenTrigger,
  BottomSheetTextInput,
  useBottomSheet,
} from "~/components/ui/bottom-sheet.native";
import { Button } from "~/components/ui/button";
import { Check } from "~/lib/icons/Check";
import { ChevronsUpDown } from "~/lib/icons/ChevronsUpDown";
import { Search } from "~/lib/icons/Search";
import { cn } from "~/lib/utils";
import { Text } from "../ui/text";
const HEADER_HEIGHT = 130;

interface ComboboxOption {
  label?: string;
  value?: string;
  flag?: string;
  currency?: string;
  countryCode?: string;
  accountNumber?: string;
  phoneCode?: number;
}
const DropDownSelector = React.forwardRef<
  React.ElementRef<typeof Button>,
  Omit<React.ComponentPropsWithoutRef<typeof Button>, "children"> & {
    options: ComboboxOption[];
    placeholder?: string;
    inputProps?: React.ComponentPropsWithoutRef<typeof BottomSheetTextInput>;
    emptyText?: string;
    defaultSelectedItem?: ComboboxOption | null;
    selectedItem?: ComboboxOption | null;
    onSelectedItemChange?: (option: ComboboxOption | null) => void;
    isSearchable?: boolean;
    textClass?: any;
    headerClass?: any;
    placeholderClassName?: any;
  }
>(
  (
    {
      className,
      headerClass,
      textClass,
      placeholderClassName,
      variant = "outline",
      size = "sm",
      inputProps,
      placeholder,
      options,
      emptyText = "Nothing found...",
      defaultSelectedItem = null,
      selectedItem: selectedItemProp,
      onSelectedItemChange,
      isSearchable,
      ...props
    },
    ref,
  ) => {
    const insets = useSafeAreaInsets();
    const [search, setSearch] = React.useState("");
    const [selectedItem, setSelectedItem] =
      React.useState<ComboboxOption | null>(defaultSelectedItem);
    const bottomSheet = useBottomSheet();
    const inputRef =
      React.useRef<React.ComponentRef<typeof BottomSheetTextInput>>(null);
    const { close } = useBottomSheet();
    const listItems = React.useMemo(() => {
      return search
        ? options.filter((item) => {
            return item.label
              ?.toLocaleLowerCase()
              .includes(search.toLocaleLowerCase());
          })
        : options;
    }, [options, search]);

    function onItemChange(listItem: ComboboxOption) {
      if (selectedItemProp?.value === listItem.value) {
        return null;
      }
      setSearch("");
      bottomSheet.close();
      return listItem;
    }
    function onSubmitEditing() {
      const firstItem = listItems[0];
      if (!firstItem) return;
      if (onSelectedItemChange) {
        onSelectedItemChange(firstItem);
      } else {
        setSelectedItem(firstItem);
      }
      bottomSheet.close();
    }

    const renderItem = React.useCallback(
      ({ item }: ListRenderItemInfo<unknown>) => {
        const listItem = item as ComboboxOption;
        const isSelected = onSelectedItemChange
          ? selectedItemProp?.value === listItem.value
          : selectedItem?.value === listItem.value;

        return (
          <TouchableOpacity
            // variant="ghost"
            className="flex-row justify-between py-4 items-center"
            style={{ minHeight: 50 }}
            onPress={() => {
              if (onSelectedItemChange) {
                onSelectedItemChange(onItemChange(listItem));
                return;
              }
              setSelectedItem(onItemChange(listItem));
              // close();
            }}
          >
            {listItem.phoneCode ? (
              <View className="flex-row justify-between items-center">
                <View className="flex-row gap-2">
                  <Text className={"text-foreground text-lg "}>
                    {listItem.label}
                  </Text>
                  <Text className={"text-lg "}>-</Text>
                  <Text className={"text-foreground text-lg"}>
                    +{listItem.phoneCode}
                  </Text>
                </View>
              </View>
            ) : (
              <View className="flex-row justify-between">
                <View className="flex-row gap-2">
                  <Text className={"text-foreground text-lg"}>
                    {listItem.label}
                  </Text>
                  <Text className={"text-foreground text-lg "}>
                    {listItem.accountNumber}
                  </Text>
                </View>
              </View>
            )}
            {isSelected && <Check size={25} className={"text-info mt-1.5"} />}
          </TouchableOpacity>
        );
      },
      [selectedItem, selectedItemProp],
    );
    function onSearchIconPress() {
      if (!inputRef.current) return;
      const input = inputRef.current;
      if (input && "focus" in input && typeof input.focus === "function") {
        input.focus();
      }
    }
    const itemSelected = onSelectedItemChange ? selectedItemProp : selectedItem;

    return (
      <BottomSheet>
        <BottomSheetOpenTrigger
          ref={ref}
          className={cn("")}
          role="combobox"
          {...props}
          // onPress={close}
        >
          <View
            className={cn(
              "flex-row justify-between h-14 border border-info items-center rounded-md bg-background px-2",
              headerClass,
            )}
          >
            <View>
              {itemSelected ? (
                <Text
                  className={cn("text-primary text-lg", textClass)}
                  numberOfLines={1}
                >
                  {itemSelected.label}
                </Text>
              ) : (
                <Text
                  className={cn(
                    "text-muted-foreground text-lg",
                    placeholderClassName,
                  )}
                >
                  {placeholder ?? ""}
                </Text>
              )}
            </View>
            <ChevronsUpDown className="text-foreground ml-2" />
          </View>
        </BottomSheetOpenTrigger>
        <BottomSheetContent
          ref={bottomSheet.ref}
          onDismiss={() => {
            setSearch("");
          }}
        >
          <BottomSheetHeader className="border-b-0">
            <Text className="text-foreground text-xl font-bold text-center px-0.5">
              {placeholder}
            </Text>
          </BottomSheetHeader>
          <View className="relative px-4 border-b border-border pb-4">
            {isSearchable && (
              <View>
                <BottomSheetTextInput
                  role="searchbox"
                  ref={inputRef}
                  className="pl-12"
                  value={search}
                  onChangeText={setSearch}
                  onSubmitEditing={onSubmitEditing}
                  returnKeyType="next"
                  clearButtonMode="while-editing"
                  placeholder="Search..."
                  {...inputProps}
                />
                <Button
                  variant={"ghost"}
                  size="sm"
                  className="absolute left-1 top-2.5"
                  onPress={onSearchIconPress}
                >
                  <Search size={18} className="text-foreground opacity-50" />
                </Button>
              </View>
            )}
          </View>
          <BottomSheetFlatList
            data={listItems}
            contentContainerStyle={{
              paddingBottom: insets.bottom + HEADER_HEIGHT,
            }}
            initialNumToRender={30}
            getItemCount={(data) => data.length}
            getItem={(data, index) => data[index]}
            renderItem={renderItem}
            keyExtractor={(item, index) =>
              (item as ComboboxOption)?.value ?? index.toString()
            }
            className={"px-4"}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={() => {
              return (
                <View
                  className="items-center flex-row justify-center flex-1  px-3 py-5"
                  style={{ minHeight: 70 }}
                >
                  <Text className={"text-muted-foreground text-xl text-center"}>
                    {emptyText}
                  </Text>
                </View>
              );
            }}
          />
        </BottomSheetContent>
      </BottomSheet>
    );
  },
);

export default DropDownSelector;
