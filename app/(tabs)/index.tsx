import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, Leaf, Bell, Sparkles, Image as ImageIcon } from 'lucide-react-native';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

export default function HomeScreen() {
  const recentIdentifications = [
    { id: 1, name: 'Monstera Deliciosa', image: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: 2, name: 'Ficus Lyrata', image: 'https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: 3, name: 'Snake Plant', image: 'https://images.pexels.com/photos/6208088/pexels-photo-6208088.jpeg?auto=compress&cs=tinysrgb&w=200' },
  ];

  const handlePlantIdentification = () => {
    Alert.alert(
      'Bitki Tanımlama',
      'Nasıl bir fotoğraf kullanmak istiyorsunuz?',
      [
        {
          text: 'Kamera',
          onPress: openCamera,
        },
        {
          text: 'Galeri',
          onPress: openGallery,
        },
        {
          text: 'İptal',
          style: 'cancel',
        },
      ]
    );
  };

  const openCamera = async () => {
    try {
      // Kamera izni iste
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      
      if (cameraPermission.status !== 'granted') {
        Alert.alert('İzin Gerekli', 'Kamera kullanmak için izin vermeniz gerekiyor.');
        return;
      }

      // Kamerayı aç
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        // Fotoğraf çekildi, analiz simülasyonu
        simulateAnalysis(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Hata', 'Kamera açılırken bir hata oluştu.');
    }
  };

  const openGallery = async () => {
    try {
      // Galeri izni iste
      const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (galleryPermission.status !== 'granted') {
        Alert.alert('İzin Gerekli', 'Galeri erişimi için izin vermeniz gerekiyor.');
        return;
      }

      // Galeriyi aç
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        // Fotoğraf seçildi, analiz simülasyonu
        simulateAnalysis(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Hata', 'Galeri açılırken bir hata oluştu.');
    }
  };

  const simulateAnalysis = (imageUri: string) => {
    Alert.alert(
      'Analiz Tamamlandı! 🌿',
      'Monstera Deliciosa\n\nGüven: %94\nTür: İç Mekan Bitkisi\nBakım: Orta seviye\nSulama: Haftada 1-2 kez\nIşık: Parlak, dolaylı ışık',
      [
        {
          text: 'Bitkilerime Ekle',
          onPress: () => {
            Alert.alert('Başarılı!', 'Bitki koleksiyonunuza eklendi.');
          },
        },
        {
          text: 'Tamam',
          style: 'cancel',
        },
      ]
    );
  };

  const handlePremiumUpgrade = () => {
    router.push('/paywall');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Merhaba! 👋</Text>
            <Text style={styles.title}>Bitkilerinizi keşfedin</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="#16A34A" />
          </TouchableOpacity>
        </View>

        {/* Main Action Card */}
        <TouchableOpacity style={styles.mainCard} onPress={handlePlantIdentification}>
          <LinearGradient
            colors={['#22C55E', '#16A34A']}
            style={styles.gradientCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.cardContent}>
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>Bitki Tanımlayın</Text>
                <Text style={styles.cardSubtitle}>Kameranızla anında tanımlayın</Text>
              </View>
              <Camera size={32} color="#FFFFFF" />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Features Grid */}
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>Özellikler</Text>
          <View style={styles.featuresGrid}>
            <TouchableOpacity style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Leaf size={24} color="#16A34A" />
              </View>
              <Text style={styles.featureTitle}>Hastalık Tespiti</Text>
              <Text style={styles.featureSubtitle}>Yapay zeka ile analiz</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <ImageIcon size={24} color="#16A34A" />
              </View>
              <Text style={styles.featureTitle}>Galeri</Text>
              <Text style={styles.featureSubtitle}>Kayıtlı fotoğraflardan seç</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Identifications */}
        <View style={styles.recentContainer}>
          <Text style={styles.sectionTitle}>Son Tanımlamalar</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentScroll}>
            {recentIdentifications.map((plant) => (
              <TouchableOpacity key={plant.id} style={styles.recentCard}>
                <Image source={{ uri: plant.image }} style={styles.recentImage} />
                <Text style={styles.recentName}>{plant.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Premium Banner */}
        <TouchableOpacity style={styles.premiumBanner} onPress={handlePremiumUpgrade}>
          <LinearGradient
            colors={['#FEF3C7', '#FDE68A']}
            style={styles.premiumGradient}
          >
            <View style={styles.premiumContent}>
              <Sparkles size={20} color="#D97706" />
              <Text style={styles.premiumText}>Premium'a geçin ve sınırsız erişim kazanın!</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  greeting: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '400',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginTop: 4,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  mainCard: {
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  gradientCard: {
    padding: 24,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cardSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  featuresContainer: {
    paddingHorizontal: 20,
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  featureCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  featureSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
  },
  recentContainer: {
    paddingHorizontal: 20,
    marginTop: 32,
  },
  recentScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  recentCard: {
    width: 120,
    marginRight: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  recentImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  recentName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#111827',
    textAlign: 'center',
  },
  premiumBanner: {
    marginHorizontal: 20,
    marginVertical: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  premiumGradient: {
    padding: 16,
  },
  premiumContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  premiumText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D97706',
  },
});