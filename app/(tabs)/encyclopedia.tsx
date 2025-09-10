import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Search, Filter, Star, Droplets, Sun, Thermometer } from 'lucide-react-native';

export default function EncyclopediaScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tümü', icon: '🌿' },
    { id: 'indoor', name: 'İç Mekan', icon: '🏠' },
    { id: 'outdoor', name: 'Dış Mekan', icon: '🌳' },
    { id: 'flowering', name: 'Çiçekli', icon: '🌸' },
    { id: 'succulent', name: 'Sukulent', icon: '🌵' },
  ];

  const plants = [
    {
      id: 1,
      name: 'Monstera Deliciosa',
      scientificName: 'Monstera deliciosa',
      category: 'indoor',
      difficulty: 'Kolay',
      image: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=400',
      watering: 'Haftada 1-2 kez',
      light: 'Parlak, dolaylı ışık',
      temperature: '18-25°C',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Snake Plant',
      scientificName: 'Sansevieria trifasciata',
      category: 'indoor',
      difficulty: 'Çok Kolay',
      image: 'https://images.pexels.com/photos/7084307/pexels-photo-7084307.jpeg?auto=compress&cs=tinysrgb&w=400',
      watering: '2-3 haftada bir',
      light: 'Az ışık tolere eder',
      temperature: '15-30°C',
      rating: 4.9,
    },
    {
      id: 3,
      name: 'Fiddle Leaf Fig',
      scientificName: 'Ficus lyrata',
      category: 'indoor',
      difficulty: 'Orta',
      image: 'https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg?auto=compress&cs=tinysrgb&w=400',
      watering: 'Haftada 1 kez',
      light: 'Parlak, dolaylı ışık',
      temperature: '18-24°C',
      rating: 4.3,
    },
    {
      id: 4,
      name: 'Aloe Vera',
      scientificName: 'Aloe barbadensis',
      category: 'succulent',
      difficulty: 'Kolay',
      image: 'https://images.pexels.com/photos/4022090/pexels-photo-4022090.jpeg?auto=compress&cs=tinysrgb&w=400',
      watering: '2-3 haftada bir',
      light: 'Parlak ışık',
      temperature: '13-27°C',
      rating: 4.7,
    },
    {
      id: 5,
      name: 'Peace Lily',
      scientificName: 'Spathiphyllum wallisii',
      category: 'flowering',
      difficulty: 'Kolay',
      image: 'https://images.pexels.com/photos/4503297/pexels-photo-4503297.jpeg?auto=compress&cs=tinysrgb&w=400',
      watering: 'Haftada 1 kez',
      light: 'Orta ışık',
      temperature: '18-25°C',
      rating: 4.5,
    },
    {
      id: 6,
      name: 'Rubber Plant',
      scientificName: 'Ficus elastica',
      category: 'indoor',
      difficulty: 'Kolay',
      image: 'https://images.pexels.com/photos/6208088/pexels-photo-6208088.jpeg?auto=compress&cs=tinysrgb&w=400',
      watering: 'Haftada 1 kez',
      light: 'Parlak, dolaylı ışık',
      temperature: '16-24°C',
      rating: 4.6,
    },
  ];

  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || plant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderPlantItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.plantCard}>
      <Image source={{ uri: item.image }} style={styles.plantImage} />
      <View style={styles.plantInfo}>
        <View style={styles.plantHeader}>
          <Text style={styles.plantName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={12} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        </View>
        <Text style={styles.scientificName}>{item.scientificName}</Text>
        <View style={styles.difficultyTag}>
          <Text style={styles.difficultyText}>{item.difficulty}</Text>
        </View>
        <View style={styles.careInfo}>
          <View style={styles.careItem}>
            <Droplets size={14} color="#3B82F6" />
            <Text style={styles.careText}>{item.watering}</Text>
          </View>
          <View style={styles.careItem}>
            <Sun size={14} color="#F59E0B" />
            <Text style={styles.careText}>{item.light}</Text>
          </View>
          <View style={styles.careItem}>
            <Thermometer size={14} color="#EF4444" />
            <Text style={styles.careText}>{item.temperature}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bitki Ansiklopedisi</Text>
        <Text style={styles.subtitle}>{filteredPlants.length} bitki bulundu</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Bitki adı veya tür ara..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#16A34A" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text style={styles.categoryEmoji}>{category.icon}</Text>
            <Text style={[
              styles.categoryText,
              selectedCategory === category.id && styles.categoryTextActive
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Plants List */}
      <FlatList
        data={filteredPlants}
        renderItem={renderPlantItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.plantsContainer}
        showsVerticalScrollIndicator={false}
        numColumns={1}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesContent: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryButtonActive: {
    backgroundColor: '#16A34A',
  },
  categoryEmoji: {
    fontSize: 16,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  plantsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  plantCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  plantImage: {
    width: '100%',
    height: 160,
  },
  plantInfo: {
    padding: 16,
  },
  plantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  plantName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  scientificName: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  difficultyTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#16A34A',
  },
  careInfo: {
    gap: 8,
  },
  careItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  careText: {
    fontSize: 12,
    color: '#6B7280',
  },
});