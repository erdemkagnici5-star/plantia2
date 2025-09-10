import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Crown, X, Check, Sparkles, Camera, Leaf, Book, Bell } from 'lucide-react-native';
import { router } from 'expo-router';

interface PlanOption {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  period: string;
  savings?: string;
  popular?: boolean;
}

const plans: PlanOption[] = [
  {
    id: 'monthly',
    name: 'Aylık',
    price: '₺49,99',
    period: 'ay',
  },
  {
    id: 'yearly',
    name: 'Yıllık',
    price: '₺299,99',
    originalPrice: '₺599,99',
    period: 'yıl',
    savings: '%50 Tasarruf',
    popular: true,
  },
];

const premiumFeatures = [
  {
    icon: Camera,
    title: 'Sınırsız Tanıma',
    description: 'Günlük limit olmadan bitki tanımlayın',
    color: '#3B82F6',
  },
  {
    icon: Leaf,
    title: 'Detaylı Hastalık Raporları',
    description: 'Profesyonel tedavi önerileri ve rehberlik',
    color: '#16A34A',
  },
  {
    icon: Book,
    title: 'Tam Ansiklopedi Erişimi',
    description: '10,000+ bitki türü ve bakım rehberi',
    color: '#F59E0B',
  },
  {
    icon: Bell,
    title: 'Akıllı Hatırlatıcılar',
    description: 'Kişiselleştirilmiş bakım bildirimleri',
    color: '#8B5CF6',
  },
];

export default function PaywallScreen() {
  const [selectedPlan, setSelectedPlan] = useState('yearly');

  const handleSubscribe = () => {
    // Implement subscription logic here
    console.log('Subscribing to plan:', selectedPlan);
    router.back();
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F0FDF4', '#FFFFFF']}
        style={styles.background}
      >
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <X size={24} color="#6B7280" />
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.crownContainer}>
              <LinearGradient
                colors={['#F59E0B', '#D97706']}
                style={styles.crownGradient}
              >
                <Crown size={32} color="#FFFFFF" />
              </LinearGradient>
              <View style={styles.sparklesContainer}>
                <Sparkles size={16} color="#F59E0B" style={styles.sparkle1} />
                <Sparkles size={12} color="#D97706" style={styles.sparkle2} />
                <Sparkles size={14} color="#F59E0B" style={styles.sparkle3} />
              </View>
            </View>
            
            <Text style={styles.title}>Premium'a Geçin</Text>
            <Text style={styles.subtitle}>
              Bitkilerinizin uzmanı olun ve sınırsız özelliklerle keşfetmeye devam edin
            </Text>
          </View>

          {/* Features */}
          <View style={styles.featuresContainer}>
            {premiumFeatures.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={[styles.featureIcon, { backgroundColor: feature.color + '20' }]}>
                  <feature.icon size={20} color={feature.color} />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
                <Check size={20} color="#16A34A" />
              </View>
            ))}
          </View>

          {/* Pricing Plans */}
          <View style={styles.plansContainer}>
            <Text style={styles.plansTitle}>Planınızı Seçin</Text>
            
            {plans.map((plan) => (
              <TouchableOpacity
                key={plan.id}
                style={[
                  styles.planCard,
                  selectedPlan === plan.id && styles.planCardSelected,
                  plan.popular && styles.planCardPopular
                ]}
                onPress={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularText}>EN POPÜLER</Text>
                  </View>
                )}
                
                <View style={styles.planContent}>
                  <View style={styles.planLeft}>
                    <Text style={styles.planName}>{plan.name}</Text>
                    <View style={styles.priceContainer}>
                      <Text style={styles.planPrice}>{plan.price}</Text>
                      <Text style={styles.planPeriod}>/{plan.period}</Text>
                      {plan.originalPrice && (
                        <Text style={styles.originalPrice}>{plan.originalPrice}</Text>
                      )}
                    </View>
                    {plan.savings && (
                      <Text style={styles.savings}>{plan.savings}</Text>
                    )}
                  </View>
                  
                  <View style={[
                    styles.radioButton,
                    selectedPlan === plan.id && styles.radioButtonSelected
                  ]}>
                    {selectedPlan === plan.id && <View style={styles.radioButtonInner} />}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Subscribe Button */}
          <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
            <LinearGradient
              colors={['#22C55E', '#16A34A']}
              style={styles.subscribeGradient}
            >
              <Text style={styles.subscribeText}>
                {selectedPlan === 'yearly' ? 'Yıllık' : 'Aylık'} Aboneliği Başlat
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Terms */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              Abonelik otomatik olarak yenilenir. İptal için ayarlardan abonelik yönetimi bölümünü kullanın. Ödeme iTunes hesabınızdan tahsil edilir.
            </Text>
            <View style={styles.linksContainer}>
              <TouchableOpacity>
                <Text style={styles.linkText}>Kullanım Koşulları</Text>
              </TouchableOpacity>
              <Text style={styles.linkSeparator}>•</Text>
              <TouchableOpacity>
                <Text style={styles.linkText}>Gizlilik Politikası</Text>
              </TouchableOpacity>
              <Text style={styles.linkSeparator}>•</Text>
              <TouchableOpacity>
                <Text style={styles.linkText}>Aboneliği İptal Et</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingTop: 100,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  crownContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  crownGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
  sparklesContainer: {
    position: 'absolute',
    width: 120,
    height: 120,
    top: -20,
    left: -20,
  },
  sparkle1: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
  sparkle2: {
    position: 'absolute',
    bottom: 20,
    left: 10,
  },
  sparkle3: {
    position: 'absolute',
    top: 30,
    left: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  plansContainer: {
    marginBottom: 32,
  },
  plansTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 20,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  planCardSelected: {
    borderColor: '#16A34A',
    backgroundColor: '#F0FDF4',
  },
  planCardPopular: {
    borderColor: '#F59E0B',
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    left: 20,
    right: 20,
    backgroundColor: '#F59E0B',
    borderRadius: 12,
    paddingVertical: 6,
    alignItems: 'center',
  },
  popularText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  planContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  planLeft: {
    flex: 1,
  },
  planName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#16A34A',
  },
  planPeriod: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 4,
  },
  originalPrice: {
    fontSize: 16,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  savings: {
    fontSize: 14,
    fontWeight: '600',
    color: '#16A34A',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#16A34A',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#16A34A',
  },
  subscribeButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  subscribeGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  subscribeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  termsContainer: {
    alignItems: 'center',
  },
  termsText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  linksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  linkText: {
    fontSize: 12,
    color: '#16A34A',
    fontWeight: '500',
  },
  linkSeparator: {
    fontSize: 12,
    color: '#9CA3AF',
    marginHorizontal: 8,
  },
});