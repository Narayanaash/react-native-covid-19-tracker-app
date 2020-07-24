import React, { Fragment, useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";

const styles = StyleSheet.create({});

const App = () => {
  const [confirmed, setConfirmed] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [recovered, setRecovered] = useState(0);
  const [lastUpdate, setlastUpdate] = useState(0);
  const [fetchedCountries, setFetchedCountries] = useState([]);
  const [country, setCountry] = useState("");

  useEffect(() => {
    fetchCountries();
    fetchData();
  }, [setFetchedCountries]);

  const fetchData = async (country) => {
    let url = "https://covid19.mathdro.id/api";

    let changeableUrl = url;

    if (country) {
      changeableUrl = `${url}/countries/${country}`;
      setCountry(country);
    }

    try {
      const {
        data: { confirmed, recovered, deaths, lastUpdate },
      } = await axios.get(changeableUrl);

      setConfirmed(confirmed);
      setDeaths(deaths);
      setRecovered(recovered);
      setlastUpdate(lastUpdate);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCountries = async () => {
    try {
      const {
        data: { countries },
      } = await axios.get(`https://covid19.mathdro.id/api/countries`);

      const allCountry = countries.map((country) => country.name);
      setFetchedCountries(allCountry);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCountryChange = async (country) => {
    await fetchData(country);
  };

  return (
    <ScrollView styel={{ backgroundColor: "blue" }}>
      <View style={{ marginTop: 60, marginBottom: 40 }}>
        <Text style={{ fontSize: 25, textAlign: "center" }}>
          COVID-19 UPDATE
        </Text>
        <Text style={{ fontSize: 10, textAlign: "center" }}>
          LAST UPDATE:{" "}
          {lastUpdate ? new Date(lastUpdate).toDateString() : "loading..."}
        </Text>
        <RNPickerSelect
          placeholder={{
            label: "Select a country...",
            value: null,
          }}
          onValueChange={(value) => handleCountryChange(value)}
          items={fetchedCountries.map((country, i) => ({
            key: i,
            label: country,
            value: country,
          }))}
        />
      </View>
      <View>
        <Text style={{ textAlign: "center" }}>
          {country !== "" ? country : "Global"}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 200,
            height: 120,
            marginBottom: 30,
            backgroundColor: "powderblue",
            borderBottomWidth: 5,
            borderBottomColor: "orange",
            borderRadius: 10,
            elevation: 5,
            shadowColor: "grey",
            shadowOffset: {
              width: 4,
              height: 4,
            },
            shadowOpacity: 50,
            shadowRadius: 4,
          }}
        >
          <Text style={{ textAlign: "center", paddingTop: 20 }}>
            TOTAL CONFIRMED CASE:
          </Text>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              textAlign: "center",
              paddingTop: 20,
            }}
          >
            {confirmed.value ? confirmed.value : "loading..."}
          </Text>
        </View>
        <View
          style={{
            width: 200,
            height: 120,
            marginBottom: 30,
            backgroundColor: "skyblue",
            borderBottomWidth: 5,
            borderBottomColor: "red",
            borderRadius: 10,
            elevation: 5,
            shadowColor: "grey",
            shadowOffset: {
              width: 4,
              height: 4,
            },
            shadowOpacity: 50,
            shadowRadius: 4,
          }}
        >
          <Text style={{ textAlign: "center", paddingTop: 20 }}>
            TOTAL DEATHS:
          </Text>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              textAlign: "center",
              paddingTop: 20,
            }}
          >
            {deaths.value ? deaths.value : "loading..."}
          </Text>
        </View>
        <View
          style={{
            width: 200,
            height: 120,
            marginBottom: 30,
            backgroundColor: "steelblue",
            borderBottomWidth: 5,
            borderBottomColor: "lightgreen",
            borderRadius: 10,
            elevation: 5,
            shadowColor: "grey",
            shadowOffset: {
              width: 4,
              height: 4,
            },
            shadowOpacity: 50,
            shadowRadius: 4,
          }}
        >
          <Text style={{ textAlign: "center", paddingTop: 20 }}>
            TOTAL RECOVERED CASE:
          </Text>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              textAlign: "center",
              paddingTop: 20,
            }}
          >
            {recovered.value ? recovered.value : "loading..."}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default App;
