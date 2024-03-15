// TabOneScreen.js
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";

import api from "@/services/api";

import Colors from "@/constants/Colors";
import { useIsFocused } from "@react-navigation/native";
import { APP_MODE, APP_MODE_OPTIONS } from "@/config/config";
import EstablishmentView from "@/components/EstablishmentView";
import Establishment from "../establishment";
import { useCartApi } from "@/contexts/ApiCartContext";
import { useNavigation } from "@react-navigation/native";

export default function index() {
  return (
    <>{APP_MODE == APP_MODE_OPTIONS.unique ? <Establishment /> : TabTwo()}</>
  );
}

function TabTwo() {
  const [estabelecimentos, setEstabelecimentos] = useState([]);

  const { setEstablishment, cleanCart } = useCartApi();
  const nav = useNavigation();
  const isFocused = useIsFocused();

  async function init() {
    try {
      const { data } = await api.get("/api/auth/establishments");
      setEstabelecimentos(data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (isFocused) {
      cleanCart();
    }
  }, [isFocused]);

  useEffect(() => {
    init();
  }, []);

  return (
    <ScrollView
      style={{
        backgroundColor: Colors.light.background,
        paddingTop: 10,
      }}
      showsVerticalScrollIndicator={false}
    >
      {estabelecimentos.map((e) => (
        <EstablishmentView
          item={e}
          onPress={() => {
            setEstablishment(e);
            nav.navigate("establishment");
          }}
        />
      ))}
    </ScrollView>
  );
}
