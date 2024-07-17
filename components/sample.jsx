import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

function CustomButton() {
  return (
    <TouchableOpacity onPress={() => console.log('Alhamdulillah!')}>
      <Text>Button</Text>
    </TouchableOpacity>
  );
}

export default function MyNewWormhole(props) {
  const message = React.useMemo(() => 'Hello, world!', []);
  return (
    <View style={{ flex: 1, backgroundColor: 'yellow' }}>
      <Text>{message}</Text>
      <View>
        <Text>new text</Text>

        <Text>{props?.payload?.value}</Text>
      </View>
      <TouchableOpacity onPress={() => props.onClick()}>
        <Text>Click me</Text>
        </TouchableOpacity>
      <CustomButton />
    </View>
  );
}