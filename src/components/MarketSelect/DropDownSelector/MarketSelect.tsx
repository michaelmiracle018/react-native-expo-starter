/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useCallback, useRef } from "react";
import { TouchableOpacity, StyleSheet, View, Platform } from "react-native";
import Input from "./ComponentDropDown/Input/index";
import CheckBox from "./ComponentDropDown/CheckBox";
import Dropdown from "./ComponentDropDown/Dropdown/Dropdown";
import DropdownFlatList from "./ComponentDropDown/Dropdown/DropdownFlatList";
import DropdownSectionList from "./ComponentDropDown/Dropdown/DropdownSectionList";
import CustomModal from "./ComponentDropDown/CustomModal";
import { colors } from "./styles/colors";
import { DEFAULT_OPTION_LABEL, DEFAULT_OPTION_VALUE } from "./constants";
import type {
  DropdownProps,
  TFlatList,
  TFlatListItem,
  TSectionList,
  TSectionListItem,
  TSelectedItem,
} from "./types/index.types";
import { escapeRegExp, extractPropertyFromArray } from "./utils";
import { Separator } from "~/components/ui/separator";

export const MarketSelect: React.FC<DropdownProps> = ({
  testID,
  advanceLabel,
  canUnSelect = true,
  placeholder,
  label,
  error,
  helperText,
  options,
  optionLabel = DEFAULT_OPTION_LABEL,
  optionValue = DEFAULT_OPTION_VALUE,
  onValueChange,
  selectedValue,
  isMultiple,
  isSearchable,
  dropdownIcon,
  labelStyle,
  placeholderStyle,
  dropdownStyle,
  dropdownIconStyle,
  dropdownContainerStyle,
  dropdownErrorStyle,
  dropdownErrorTextStyle,
  dropdownHelperTextStyle,
  selectedItemStyle,
  multipleSelectedItemStyle,
  modalBackgroundStyle, // kept for backwards compatibility
  modalOptionsContainerStyle, // kept for backwards compatibility
  searchInputStyle, // kept for backwards compatibility
  primaryColor = colors.gray,
  disabled,
  checkboxSize, // kept for backwards compatibility
  checkboxStyle, // kept for backwards compatibility
  checkboxLabelStyle, // kept for backwards compatibility
  checkboxComponentStyles, // kept for backwards compatibility
  checkboxComponent, // kept for backwards compatibility
  listHeaderComponent,
  listFooterComponent,
  listComponentStyles,
  listEmptyComponent,
  modalProps, // kept for backwards compatibility
  hideModal = false,
  listControls,
  searchControls,
  modalControls,
  checkboxControls,
  autoCloseOnSelect = true,
  ...rest
}) => {
  const [newOptions, setNewOptions] = useState<TFlatList | TSectionList>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(""); // for single selection
  const [selectedItems, setSelectedItems] = useState<TSelectedItem[]>([]); // for multiple selection
  const [searchValue, setSearchValue] = useState<string>("");
  const [listIndex, setListIndex] = useState<{
    sectionIndex?: number;
    itemIndex: number;
  }>({ itemIndex: -1, sectionIndex: -1 }); // for scrollToIndex in Sectionlist and Flatlist

  useEffect(() => {
    setNewOptions(options);
    return () => {};
  }, [options]);

  useEffect(() => {
    isMultiple
      ? setSelectedItems(Array.isArray(selectedValue) ? selectedValue : [])
      : setSelectedItem((selectedValue as TSelectedItem) || "");

    return () => {};
  }, [selectedValue, isMultiple, onValueChange]);

  /*===========================================
   * List type
   *==========================================*/

  // check the structure of the new options array to determine if it is a section list or a
  const isSectionList = newOptions?.some(
    (item) => item.title && item.data && Array.isArray(item.data),
  );

  const ListTypeComponent = isSectionList
    ? DropdownSectionList
    : DropdownFlatList;
  const modifiedSectionData = extractPropertyFromArray(
    newOptions,
    "data",
  )?.flat();

  /**
   * `options` is the original array, it never changes. (Do not use except you really need the original array) .
   * `newOptions` is a copy of options but can be mutated by `setNewOptions`, as a result, the value may change.
   * `modifiedOptions` should only be used for computations. It has the same structure for both `FlatList` and `SectionList`
   */
  const modifiedOptions = isSectionList ? modifiedSectionData : newOptions;

  /*===========================================
   * Selection handlers
   *==========================================*/
  const handleSingleSelection = (value: TSelectedItem) => {
    if (canUnSelect && selectedItem.value === value.value) {
      setSelectedItem("");
      onValueChange(null); // send value to parent
    } else {
      setSelectedItem(value);
      onValueChange(value); // send value to parent

      if (autoCloseOnSelect) {
        setOpen(false); // close modal upon selection
      }
    }
  };

  // const handleMultipleSelections = (value: TSelectedItem) => {
  //   setSelectedItems((prevVal) => {
  //     let selectedValues = [...prevVal];

  //     if (selectedValues?.includes(value)) {
  //       selectedValues = selectedValues.filter((item) => item !== value);
  //     } else {
  //       selectedValues.push(value);
  //     }
  //     onValueChange(selectedValues); // send value to parent
  //     return selectedValues;
  //   });
  // };

  // const removeDisabledItems = (items: TFlatList) => {
  //   return items?.filter((item: TFlatListItem) => !item.disabled);
  // };

  // const handleSelectAll = () => {
  //   setSelectAll((prevVal) => {
  //     let selectedValues: TSelectedItem[] = [];

  //     // don't select disabled items
  //     const filteredOptions = removeDisabledItems(
  //       isSectionList
  //         ? extractPropertyFromArray(options, "data").flat()
  //         : options,
  //     );

  //     if (!prevVal) {
  //       selectedValues = filteredOptions.map(
  //         (obj) => obj[optionValue],
  //       ) as TSelectedItem[];
  //     }

  //     setSelectedItems(selectedValues);
  //     onValueChange(selectedValues); // send value to parent
  //     return !prevVal;
  //   });

  //   if (typeof listControls?.selectAllCallback === "function" && !selectAll) {
  //     listControls.selectAllCallback();
  //   }

  //   if (typeof listControls?.unselectAllCallback === "function" && selectAll) {
  //     listControls.unselectAllCallback();
  //   }
  // };

  /*===========================================
   * Handle side effects
   *==========================================*/
  // const checkSelectAll = useCallback(
  //   (selectedValues: TSelectedItem[]) => {
  //     //if the list contains disabled values, those values will not be selected
  //     if (
  //       removeDisabledItems(modifiedOptions)?.length === selectedValues?.length
  //     ) {
  //       setSelectAll(true);
  //     } else {
  //       setSelectAll(false);
  //     }
  //   },
  //   [modifiedOptions],
  // );

  // anytime the selected items change, check if it is time to set `selectAll` to true
  // useEffect(() => {
  //   if (isMultiple) {
  //     checkSelectAll(selectedItems);
  //   }
  //   return () => {};
  // }, [ isMultiple, selectedItems]);

  /*===========================================
   * Get label handler
   *==========================================*/
  const getSelectedItemsLabel = () => {
    let selectedItemLabel = modifiedOptions?.find(
      (item: TFlatListItem) => item.id === selectedItem.id,
    );
    return selectedItemLabel;
  };

  /*===========================================
   * Search
   *==========================================*/
  const onSearch = (value: string) => {
    setSearchValue(value);
    searchControls?.searchCallback?.(value);

    let searchText = escapeRegExp(value).toString().toLocaleLowerCase().trim();

    const regexFilter = new RegExp(searchText, "i");

    // Because the options array will be mutated while searching, we have to search with the original array
    const searchResults = isSectionList
      ? searchSectionList(options as TSectionList, regexFilter)
      : searchFlatList(options as TFlatList, regexFilter);

    setNewOptions(searchResults);
  };

  const searchFlatList = (flatList: TFlatList, regexFilter: RegExp) => {
    const searchResults = flatList.filter((item: TFlatListItem) => {
      if (
        item[optionLabel].toString().toLowerCase().search(regexFilter) !== -1 ||
        item[optionValue].toString().toLowerCase().search(regexFilter) !== -1
      ) {
        return true;
      }
      return false;
    });
    return searchResults;
  };

  const searchSectionList = (
    sectionList: TSectionList,
    regexFilter: RegExp,
  ) => {
    const searchResults = sectionList.map((listItem: TSectionListItem) => {
      const filteredData = listItem.data.filter((item: TFlatListItem) => {
        if (
          item[optionLabel].toString().toLowerCase().search(regexFilter) !==
            -1 ||
          item[optionValue].toString().toLowerCase().search(regexFilter) !== -1
        ) {
          return true;
        }
        return false;
      });

      return { ...listItem, data: filteredData };
    });

    return searchResults;
  };

  /**
   * To prevent triggering on modalProps.onDismiss on first render, we perform this check
   */
  const hasComponentBeenRendered = useRef(false);

  /**
   * Explicitly adding this here because the onDismiss only works on iOS Modals
   * https://reactnative.dev/docs/modal#ondismiss-ios
   */
  useEffect(() => {
    if (
      hasComponentBeenRendered.current &&
      !open &&
      Platform.OS === "android"
    ) {
      modalControls?.modalProps?.onDismiss?.();
    }

    hasComponentBeenRendered.current = true;
  }, [open]);

  /*===========================================
   * Modal
   *==========================================*/
  const openModal = () => {
    if (disabled) {
      return;
    }
    setOpen(true);
    resetComponent();
  };

  const closeModal = () => {
    setOpen(false);
    resetComponent();
  };

  const resetComponent = () => {
    setSearchValue("");
    setNewOptions(options);
    setListIndex({ itemIndex: -1, sectionIndex: -1 });
  };

  useEffect(() => {
    if (hideModal) {
      setOpen(false);
    }
    return () => {};
  }, [hideModal]);

  /*===========================================
   * setIndexOfSelectedItem - For ScrollToIndex
   *==========================================*/
  const setIndexOfSelectedItem = (selectedLabel: string | any) => {
    isSectionList
      ? (options as TSectionListItem[] | undefined)?.map(
          (item: TSectionListItem, sectionIndex: number) => {
            item?.data?.find((dataItem: TFlatListItem, itemIndex: number) => {
              if (dataItem[optionLabel] === selectedLabel) {
                setListIndex({ sectionIndex, itemIndex });
              }
            });
          },
        )
      : (options as TFlatListItem[] | undefined)?.find(
          (item: TFlatListItem, itemIndex: number) => {
            if (item[optionLabel] === selectedLabel.label) {
              setListIndex({ itemIndex });
            }
          },
        );
  };

  return (
    <>
      <Dropdown
        testID={testID}
        label={label}
        // advanceLabel={advanceLabel}
        placeholder={placeholder}
        helperText={helperText}
        error={error}
        getSelectedItemsLabel={getSelectedItemsLabel}
        selectedItem={selectedItem}
        selectedItems={selectedItems}
        openModal={openModal}
        closeModal={closeModal}
        labelStyle={labelStyle}
        dropdownIcon={dropdownIcon}
        dropdownStyle={dropdownStyle}
        dropdownIconStyle={dropdownIconStyle}
        dropdownContainerStyle={dropdownContainerStyle}
        dropdownErrorStyle={dropdownErrorStyle}
        dropdownErrorTextStyle={dropdownErrorTextStyle}
        dropdownHelperTextStyle={dropdownHelperTextStyle}
        selectedItemStyle={selectedItemStyle}
        multipleSelectedItemStyle={multipleSelectedItemStyle}
        isMultiple={isMultiple}
        primaryColor={primaryColor}
        disabled={disabled}
        placeholderStyle={placeholderStyle}
        setIndexOfSelectedItem={setIndexOfSelectedItem}
        {...rest}
      />
      <CustomModal
        visible={open}
        modalBackgroundStyle={modalBackgroundStyle} // kept for backwards compatibility
        modalOptionsContainerStyle={modalOptionsContainerStyle} // kept for backwards compatibility
        closeModal={closeModal}
        modalControls={modalControls}
        modalProps={modalProps} // kept for backwards compatibility
      >
        <ListTypeComponent
          ListHeaderComponent={
            <>
              {listHeaderComponent}

              {isSearchable && (
                <Input
                  value={searchValue}
                  onChangeText={(text: string) => onSearch(text)}
                  style={[
                    searchControls?.textInputStyle || searchInputStyle,
                    { height: 10 },
                  ]}
                  primaryColor={primaryColor}
                  textInputContainerStyle={
                    searchControls?.textInputContainerStyle
                  }
                  placeholder={
                    searchControls?.textInputProps?.placeholder || "Search"
                  }
                  {...searchControls?.textInputProps}
                />
              )}
              {/* {!listControls?.hideSelectAll &&
                isMultiple &&
                modifiedOptions?.length > 1 && (
                  <View style={styles.optionsContainerStyle}>
                    <TouchableOpacity onPress={() => {}}>
                      <CheckBox
                        value={selectAll}
                        label={
                          selectAll
                            ? listControls?.unselectAllText || "Clear all"
                            : listControls?.selectAllText || "Select all"
                        }
                        onChange={() => handleSelectAll()}
                        primaryColor={primaryColor}
                        checkboxControls={checkboxControls}
                        checkboxSize={checkboxSize}
                        checkboxStyle={checkboxStyle}
                        checkboxLabelStyle={checkboxLabelStyle}
                        checkboxComponentStyles={checkboxComponentStyles}
                        checkboxComponent={checkboxComponent}
                      />
                    </TouchableOpacity>
                  </View>
                )} */}
              <Separator className="mt-0 bg-gray-200" />
            </>
          }
          listHeaderComponent={listHeaderComponent}
          onSearch={onSearch}
          searchControls={searchControls}
          searchInputStyle={searchInputStyle}
          ListFooterComponent={listFooterComponent}
          listComponentStyles={listComponentStyles}
          options={newOptions}
          optionLabel={optionLabel}
          optionValue={optionValue}
          isMultiple={isMultiple}
          isSearchable={isSearchable}
          selectedItems={selectedItems}
          selectedItem={selectedItem}
          // handleMultipleSelections={handleMultipleSelections}
          handleSingleSelection={handleSingleSelection}
          primaryColor={primaryColor}
          checkboxSize={checkboxSize}
          checkboxStyle={checkboxStyle}
          checkboxLabelStyle={checkboxLabelStyle}
          checkboxComponentStyles={checkboxComponentStyles}
          checkboxComponent={checkboxComponent}
          checkboxControls={checkboxControls}
          listIndex={listIndex}
          listEmptyComponent={listEmptyComponent}
          emptyListMessage={listControls?.emptyListMessage}
        />
      </CustomModal>
    </>
  );
};

const styles = StyleSheet.create({
  optionsContainerStyle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
  },
});

export default MarketSelect;
