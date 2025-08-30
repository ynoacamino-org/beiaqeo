import { useAuth } from "@/components/providers/authProvider";
import { extractAvatar } from "@/lib/utils";
import { IconUser } from "@tabler/icons-react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function Profile() {
  const { user } = useAuth();
  return (
    <TouchableOpacity
      onPress={() => router.push('/account')}
      className="w-10 h-10 bg-blue-500 rounded-full items-center justify-center"
    >
      {
        user?.avatar ? (
          <Image
            source={{ uri: extractAvatar(user) }}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <IconUser size={20} color="white" />
        )
      }
    </TouchableOpacity>
  )
}