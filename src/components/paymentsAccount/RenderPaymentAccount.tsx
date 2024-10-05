import { TouchableOpacity, View } from "react-native";
import React, { memo, useState } from "react";
import { Text } from "../ui/text";
import { Card } from "../ui/card";
import { Trash2 } from "~/lib/icons/Trash2";
import ModalDisplay from "../ui/modal";
import { Button } from "../ui/button";
import WarningSign from "../CustomSign/WarningSign";
import { AllPaymentDetailsProps } from "~/types";
import { AllPAYMENTDETAILS } from "~/query-data/querykeys";
import { useToast } from "react-native-toast-notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceDeletePaymentDetails } from "~/services/payment.services";
import Colors from "~/constants/Colors";
import CircleLoading from "../loader/CircleLoading";
import { Trans } from "@lingui/macro";
import { displayErrorMessage } from "~/utils/displayErrorMessage";

function RenderPaymentAccount({
  accountName,
  accountNumber,
  address,
  bankName,
  _id,
  currency,
}: AllPaymentDetailsProps) {
  const [showModal, setShowModal] = useState(false);
  const toast = useToast();
  const queryClient = useQueryClient();

  // ? DELETE PAYMENT
  const { mutate, isPending } = useMutation({
    mutationFn: (value: string) => serviceDeletePaymentDetails(value),
    onSuccess: (response: any) => {
      const { data } = response;
      console.log(data);

      toast.hideAll();
      setShowModal(false);
      if (data?.statusCode === 200) {
        toast.show("payment details deleted successfully", {
          type: "custom_toast_without_title",
          animationDuration: 300,
          normalColor: "success",
        });
        queryClient.invalidateQueries({
          queryKey: [AllPAYMENTDETAILS],
        });
      }
    },
    onError: (error) => {
      setShowModal(false);
      displayErrorMessage(error);
    },
  });

  // * DELETING A PAYMENT DETAILS
  const deletePaymentDetails = async () => {
    mutate(_id);
  };

  return (
    <>
      <View className="spacing-1">
        <Card className="rounded-md flex-row justify-between px-2 py-5">
          <View>
            <View className="flex-row gap-2 mb-1">
              <Text className="font-bold">Account Name:</Text>
              <Text>{accountName}</Text>
            </View>
            <View className="flex-row gap-2 mb-1">
              <Text className="font-bold">Bank Name:</Text>
              <Text>{bankName}</Text>
            </View>
            <View className="flex-row gap-2 mb-1">
              <Text className="font-bold">Account Number:</Text>
              <Text>{accountNumber}</Text>
            </View>
            <View className="flex-row gap-2 mb-1">
              <Text className="font-bold">Currency:</Text>
              <Text>{currency}</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setShowModal(true)}
            >
              <View className="w-10 h-10 rounded-full bg-red-50 flex-center">
                <Trash2 className="text-destructive" size={20} />
              </View>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
      <ModalDisplay visible={showModal}>
        <View className="justify-center items-center my-2">
          <WarningSign />
        </View>
        <Text className="native:text-md font-bold mt-4">
          Are you sure you want to delete this account?
        </Text>
        <View className="flex-row justify-between mt-5 gap-2">
          {!isPending && (
            <Button
              variant="info"
              className="flex-1"
              onPress={() => setShowModal(false)}
            >
              <Text>
                <Trans>Cancel</Trans>
              </Text>
            </Button>
          )}
          <Button
            variant="info"
            className="flex-1"
            disabled={isPending}
            onPress={deletePaymentDetails}
          >
            {isPending ? (
              <CircleLoading color={Colors.textHighlightColor} size={25} />
            ) : (
              <Text className="font-bold">
                <Trans>Delete</Trans>
              </Text>
            )}
          </Button>
        </View>
      </ModalDisplay>
    </>
  );
}

export default memo(RenderPaymentAccount);
