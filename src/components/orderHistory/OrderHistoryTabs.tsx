/* eslint-disable react-hooks/exhaustive-deps */
import { ScrollView, TouchableOpacity, View } from "react-native";
import React, { useMemo, useState } from "react";
import { useLingui } from "@lingui/react";
import { t } from "@lingui/macro";
import useFetchUserFromStorage from "~/shared/fetchUserFromStorage";
import { ACCOUNT_TYPE } from "~/api/common/secretKeys";
import { Text } from "../ui/text";
import { cn } from "~/lib/utils";
import { useOrderHistorySelectorControl } from "~/context/orderHistoryContext";

export default function OrderHistoryTabs() {
  const { i18n } = useLingui();
  const { storedData } = useFetchUserFromStorage(ACCOUNT_TYPE);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const { setFilterOrderHistory } = useOrderHistorySelectorControl();
  const filterOrderStatus = [
    {
      id: "dee826663",
      title: "ALL",
      select: t(i18n)`All`,
    },
    {
      id: "dee33",
      title: "FAILED",
      select: t(i18n)`Failed`,
    },
    {
      id: "dlkk933",
      title: "PENDING",
      select: t(i18n)`Pending`,
    },
    {
      id: "dee893",
      title: "APPROVED",
      select: t(i18n)`Approved`,
    },

    {
      id: "djdh33",
      title: "PROCESSING",
      select: t(i18n)`Processing`,
    },

    {
      id: "djdgddhh",
      title: "SUCCESS",
      select: t(i18n)`Success`,
    },
    {
      id: "did03",
      title: "to_approved",
      select: t(i18n)`Order to approve`,
      state: "business",
    },
  ];
  const filterStatusIndividual = useMemo(() => {
    return filterOrderStatus.filter((item) => item.state !== "business");
  }, []);
  const mapFilterData =
    storedData?.accountType === "BUSINESS"
      ? filterOrderStatus
      : filterStatusIndividual;

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 10,
        }}
      >
        {mapFilterData.map(({ id, title, select }) => (
          <TouchableOpacity
            onPress={() => {
              setFilterOrderHistory(title);
              setSelectedFilter(select);
            }}
            disabled={select === selectedFilter}
            activeOpacity={0.8}
            key={id}
            className={cn(
              "mx-4 px-3 py-2 rounded-lg",
              select === selectedFilter
                ? "bg-[rgba(60,80,224)]/90"
                : "bg-[#e5e7eb]/60",
            )}
          >
            <Text
              className={cn(
                "font-normal text-xl text-white",
                select === selectedFilter ? "text-white" : "text-black",
              )}
            >
              {select}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
