import React from "react";
import {
  View,
  Pressable,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../styles/colors";
import { inputStyles } from "../../styles/input";
import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";

const DropdownSelectedItemsView = ({
  placeholder,
  error,
  getSelectedItemsLabel,
  openModal,
  isMultiple,
  selectedItem,
  selectedItems,
  dropdownIcon,
  dropdownStyle,
  dropdownIconStyle,
  selectedItemStyle,
  placeholderStyle,
  multipleSelectedItemStyle,
  dropdownErrorStyle,
  primaryColor,
  disabled,
  setIndexOfSelectedItem,
}: any) => {
  // console.log(selectedItem, "selectedItems");
  return (
    <Pressable
      onPress={() => openModal()}
      style={[
        {
          ...inputStyles.inputFocusState,
          borderColor: primaryColor,
        },
        { ...inputStyles.input, ...dropdownStyle },
        error && //this must be last
          error !== "" && {
            ...inputStyles.inputFocusErrorState,
            ...dropdownErrorStyle,
          },
      ]}
      // className="border border-info"
      disabled={disabled}
    >
      <ScrollView
        horizontal
        alwaysBounceHorizontal
        showsHorizontalScrollIndicator={false}
      >
        <View
          style={styles.selectedItemsContainer}
          onStartShouldSetResponder={() => true}
        >
          {/* {isMultiple ? (
            getSelectedItemsLabel()?.map((label: string, i: number) => (
              <DropdownContent
                onPress={() => {
                  openModal();
                  setIndexOfSelectedItem(label); // immediately scrolls to list item with the specified label when modal
                }}
                key={`react-native-input-select-${Math.random()}-${i}`}
                style={[
                  styles.selectedItems,
                  { backgroundColor: primaryColor },
                  multipleSelectedItemStyle,
                ]}
                label={label}
                disabled={disabled}
              />
            ))
          ) : ( */}
          <DropdownContent
            onPress={() => {
              openModal();
              setIndexOfSelectedItem(getSelectedItemsLabel()); // immediately scrolls to list item with the specified label when modal
            }}
            style={[selectedItemStyle]}
            label={getSelectedItemsLabel()}
            disabled={disabled}
          />
          {/* )} */}
          {!selectedItem && selectedItems?.length === 0 && (
            <DropdownPlaceHolder
              onPress={() => openModal()}
              style={[placeholderStyle]}
              label={placeholder ?? "Select an option"}
              disabled={disabled}
            />
          )}
        </View>
      </ScrollView>
      <View style={[styles.iconStyle, dropdownIconStyle]}>
        {dropdownIcon || <Image source={require("~/assets/arrow-down.png")} />}
      </View>
    </Pressable>
  );
};

const DropdownContent = ({ onPress, style, label, ...rest }: any) => {
  // console.log(label, "hhhh");
  return (
    <TouchableOpacity onPress={() => onPress()} {...rest}>
      {label?.flag ? (
        <View className="flex-row gap-1">
          <Text style={style} className={cn("text-primary text-lg")}>
            {label?.flag}
          </Text>
          <Text style={style} className={cn("text-primary text-lg")}>
            {label?.value}
          </Text>
        </View>
      ) : (
        <Text style={style} className={cn("text-primary text-lg")}>
          {label?.label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const DropdownPlaceHolder = ({ onPress, style, label, ...rest }: any) => {
  return (
    <TouchableOpacity onPress={() => onPress()} {...rest}>
      <Text style={style} className={cn("text-foreground text-lg")}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconStyle: { position: "absolute", right: 20, top: 22 },
  selectedItemsContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
  },
  selectedItems: {
    color: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: colors.primary,
    marginRight: 10,
    overflow: "hidden",
  },
  blackText: { color: colors.black },
});

export default DropdownSelectedItemsView;
