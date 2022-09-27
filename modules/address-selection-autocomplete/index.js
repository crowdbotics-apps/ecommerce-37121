import React, { useState, useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import { OptionsContext, GlobalOptionsContext } from "@options";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Icon from "react-native-vector-icons/Feather";

navigator.geolocation = require("@react-native-community/geolocation");

const AddressAutoComplete = ({ navigation, route, onAddressSelect }) => {
 
  const [inputValue, setInputValue] = useState("");
  const [defaultValue, setDefaultValue] = useState("");
  const gOptions = useContext(GlobalOptionsContext);
  const firstOptions = useContext(OptionsContext);
 const options = firstOptions[Object.keys(firstOptions)[0]];
 
 const { apiKey, autoCompleteStyles, settings } = options;

  const getAddressHandle = (data, address) => {
    if (settings.onAddressSelect) {
      settings.onAddressSelect(data, address);
    }
    if(onAddressSelect){
      onAddressSelect(data, address);
    }
    setDefaultValue(data.description);
    setInputValue("")
  };

  const handleChange = (text) => {
    if (settings.onChangeText) {
      settings.onChangeText(text);
    }
    setInputValue(text);
  };

  const handleFail = () => {
    if (settings.onFail) {
      settings.onFail();
    }
  };

  const handleNotFound = () => {
    if (settings.onNotFound) {
      settings.onNotFound();
    }
  };


  return (
    <View style={[autoCompleteStyles.mainContainer, { height: inputValue ? "100%" : 50 }]}>
        <GooglePlacesAutocomplete
          autoFillOnNotFound={settings.autoFillOnNotFound || false}
          placeholder={settings.placeholder || "Address"}
          minLength={settings.minLength || 2}
          autoFocus={false}
          returnKeyType={"default"}
          fetchDetails={settings.fetchDetails || true}
          textInputProps={{
            onChangeText: (text) => handleChange(text),
          }}
          onPress={(data, details = null) => getAddressHandle(data, details)}
          query={{
            key: apiKey,
            language: "en",
            components: `country:${settings.country ? settings.country : null}`,
          }}
          styles={settings.styles || autoCompleteStyles}
          currentLocation={settings.currentLocation}
          currentLocationLabel={settings.currentLocationLabel}
          predefinedPlaces={settings.predefinedPlaces}
          predefinedPlacesAlwaysVisible={settings.predefinedPlacesAlwaysVisible || false}
          disableScroll={settings.disableScroll || false}
          enablePoweredByContainer={settings.enablePoweredByContainer || false}
          isRowScrollable={settings.isRowScrollable || true}
          listUnderlayColor={settings.listUnderlayColor || "#c8c7cc"}
          listViewDisplayed={settings.listViewDisplayed || "auto"}
          onFail={handleFail}
          onNotFound={handleNotFound}
          timeout={settings.timeout || 20000}
          renderLeftButton={settings.renderLeftButton}
          renderRightButton={settings.renderRightButton}
        />
    </View>
  );
};


export default {
  title: "AddressAutoComplete",
  navigator: AddressAutoComplete
};
