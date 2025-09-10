import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, Leaf, Heart, ArrowRight } from 'lucide-react-native';
import { router } from 'expo-router';
import { FlatList } from 'react-native';

const { width } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  gradient: string[];
}

const slides: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Anında Bitki Tanıma',
    subtitle: 'Saniyeler İçinde Keşfedin',
    description: 'Telefonunuzun kamerasıyla saniyeler içinde binlerce bitkiyi ve çiçeği tanıyın. Doğanın sırlarını keşfetmek hiç bu kadar kolay olmamıştı.',
    icon: Camera,
    gradient: ['#22C55E', '#16A34A'],
  },
  {
    id: '2',
    title: 'Bitkinizin Sağlığını Koruyun',
    subtitle: 'Yapay Zeka Destekli Analiz',
    description: 'Bitkinizdeki hastalık belirtilerini tespit edin ve doğru tedavi yöntemlerini öğrenin. Sağlıklı bitkiler için profesyonel rehberlik.',
    icon: Leaf,
    gradient: ['#3B82F6', '#1D4ED8'],
  },
  {
    id: '3',
    title: 'Bitkilerinizi Kaydedin ve Takip Edin',
    subtitle: 'Akıllı Bakım Asistanı',
    description: 'Bakım hatırlatıcıları ayarlayarak bitkilerinizi her zaman sağlıklı tutun. Kişisel bitki koleksiyonunuzu oluşturun.',
    icon: Heart,
    gradient: ['#F59E0B', '#D97706'],
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    router.replace('/(tabs)');
  };

  const renderSlide = ({ item, index }: { item: OnboardingSlide; index: number }) => {
    const IconComponent = item.icon;
    
    return (
      <View style={styles.slide}>
        <View style={styles.content}>
          {/* Icon */}
          <View style={styles.iconContainer}>
            <LinearGradient
              colors={item.gradient}
              style={styles.iconGradient}
            >
              <IconComponent size={48} color="#FFFFFF" />
            </LinearGradient>
          </View>

          {/* Illustration */}
          <View style={styles.illustrationContainer}>
            <Image 
              source={{ 
                uri: index === 0 
                  ? 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=300'
                  : index === 1 
                  ? 'https://images.pexels.com/photos/7084307/pexels-photo-7084307.jpeg?auto=compress&cs=tinysrgb&w=300'
                  : 'https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg?auto=compress&cs=tinysrgb&w=300'
              }} 
              style={styles.illustration} 
            />
          </View>

          {/* Text Content */}
          <View style={styles.textContainer}>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      </View>
    );
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F9FAFB', '#FFFFFF']}
        style={styles.background}
      >
        {/* Skip Button */}
        <TouchableOpacity style={styles.skipButton} onPress={handleFinish}>
          <Text style={styles.skipText}>Atla</Text>
        </TouchableOpacity>

        {/* Slides */}
        <FlatList
          ref={flatListRef}
          data={slides}
          renderItem={renderSlide}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged.current}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        />

        {/* Bottom Section */}
        <View style={styles.bottomContainer}>
          {/* Pagination Dots */}
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor: currentIndex === index ? '#16A34A' : '#E5E7EB',
                    width: currentIndex === index ? 24 : 8,
                  }
                ]}
              />
            ))}
          </View>

          {/* Action Button */}
          <TouchableOpacity style={styles.actionButton} onPress={handleNext}>
            <LinearGradient
              colors={slides[currentIndex].gradient}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>
                {currentIndex === slides.length - 1 ? 'Başla' : 'Devam'}
              </Text>
              <ArrowRight size={20} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  skipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  slide: {
    width,
    flex: 1,
    paddingHorizontal: 32,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 32,
  },
  iconGradient: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  illustrationContainer: {
    marginBottom: 48,
  },
  illustration: {
    width: 240,
    height: 240,
    borderRadius: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#16A34A',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: 36,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280,
  },
  bottomContainer: {
    paddingHorizontal: 32,
    paddingBottom: 40,
    paddingTop: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    transition: 'all 0.3s ease',
  },
  actionButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    gap: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});