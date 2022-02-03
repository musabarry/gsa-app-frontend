import React, {useEffect, useCallback, useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const TextCom = ({textData, max_line}) => {
    const max_num = max_line
    const [showText, setShowText] = useState(false);
    const [numberOfLines, setNumberOfLines] = useState(undefined);
    const [showMoreButton, setShowMoreButton] = useState(false);

    const onTextLayout = useCallback(
        (e) => {
          if (e.nativeEvent.lines.length > max_num && !showText) {
            setShowMoreButton(true);
            setNumberOfLines(max_num);
          }
        },
        [showText]
      );

      useEffect(() => {
        if (showMoreButton) {
          setNumberOfLines(showText ? undefined : max_num);
        }
      }, [showText, showMoreButton]);

    return (
        <View style={styles.textView}>
            <Text style={styles.text}
                onTextLayout={onTextLayout}
                numberOfLines={numberOfLines}
                >{textData}
            </Text>
            {showMoreButton && (
                <TouchableOpacity onPress={() => setShowText((showText) => !showText)} accessibilityRole="button">
                <Text style={styles.lineShowText}>{showText ? "Less" : "More"}</Text>
                </TouchableOpacity>
            )}
        </View>
        )
}

export default TextCom

const styles = StyleSheet.create({
    textView:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 5
    },
    text:{
      // marginLeft: 60,
      fontSize: 14,
      flexShrink: 1,
    },
    lineShowText:{
        color: '#007bff',
        fontWeight: 'bold'
    },
})
