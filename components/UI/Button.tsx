import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

type buttonType = {
  size: 'sm' | 'me' | 'la',
  text: string,
  color: string,
  textColor?: string
  pressHandler: any
}

const Button = ({ size, text, color, textColor, pressHandler }: buttonType) => {

  const textSizeMap = {
    sm: 'smTxt',
    me: 'meTxt',
    la: 'laTxt'
  }

  const textSize = textSizeMap[size] as keyof typeof styles; // 👈 fix here

  return (
    <Pressable
      onPress={pressHandler}
      style={[styles.base, styles[size], { backgroundColor: color }]}
    >
      <Text style={[styles.text, styles[textSize], {color: textColor? textColor:"white"}]}>{text}</Text>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  sm: {
    paddingVertical: 6,
    paddingHorizontal: 18,
  },
  me: {
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  la: {
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  smTxt: {
    fontSize: 16
  },
  meTxt: {
    fontSize: 20
  },
  laTxt: {
    fontSize: 24
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})
