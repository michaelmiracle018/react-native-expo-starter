import { View } from 'react-native'
import "../global.css"
import { Text } from './components/ui/text'
import { Button } from './components/ui/button'

export default function App() {
  return (
    <View className='mt-10'>
      <Text className="text-blue-500 font-bold">Hello</Text>
      <Text className='text-red-500'>GREAT</Text>
      <Button variant={"destructive"}>
        <Text>HELKKKK</Text>
      </Button>
    </View>
  )
}