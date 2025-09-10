import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Calendar, Droplets, TriangleAlert as AlertTriangle, Heart, MoveVertical as MoreVertical } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function MyPlantsScreen() {
  const myPlants = [
    {
      id: 1,
      name: 'Monstera Charlie',
      type: 'Monstera Deliciosa',
      image: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=200',
      lastWatered: '3 gün önce',
      nextWatering: '2 gün içinde',
      health: 'Sağlıklı',
      notes: 'Yeni yapraklar çıkıyor',
      daysOwned: 45,
    },
    {
      id: 2,
      name: 'Snake Beauty',
      type: 'Snake Plant',
      image: 'https://images.pexels.com/photos/7084307/pexels-photo-7084307.jpeg?auto=compress&cs=tinysrgb&w=200',
      lastWatered: '1 hafta önce',
      nextWatering: '1 hafta içinde',
      health: 'Mükemmel',
      notes: 'Çok kolay bakım',
      daysOwned: 120,
    },
    {
      id: 3,
      name: 'Fiddle Friend',
      type: 'Fiddle Leaf Fig',
      image: 'https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg?auto=compress&cs=tinysrgb&w=200',
      lastWatered: '5 gün önce',
      nextWatering: 'Bugün',
      health: 'Dikkat Gerekli',
      notes: 'Yapraklar sararmaya başladı',
      daysOwned: 28,
    },
  ];

  const upcomingTasks = [
    { id: 1, plantName: 'Fiddle Friend', task: 'Sulama', time: 'Bugün' },
    { id: 2, plantName: 'Monstera Charlie', task: 'Sulama', time: '2 gün içinde' },
    { id: 3, plantName: 'Snake Beauty', task: 'Gübreleme', time: '1 hafta içinde' },
  ];

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'Mükemmel': return '#10B981';
      case 'Sağlıklı': return '#22C55E';
      case 'Dikkat Gerekli': return '#F59E0B';
      case 'Hasta': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Bitkilerim</Text>
            <Text style={styles.subtitle}>{myPlants.length} bitki • {upcomingTasks.length} yaklaşan görev</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={24} color="#16A34A" />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{myPlants.length}</Text>
            <Text style={styles.statLabel}>Toplam Bitki</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{upcomingTasks.length}</Text>
            <Text style={styles.statLabel}>Yaklaşan Görev</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {myPlants.filter(p => p.health === 'Sağlıklı' || p.health === 'Mükemmel').length}
            </Text>
            <Text style={styles.statLabel}>Sağlıklı Bitki</Text>
          </View>
        </View>

        {/* Upcoming Tasks */}
        {upcomingTasks.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Yaklaşan Görevler</Text>
            <View style={styles.tasksContainer}>
              {upcomingTasks.map((task) => (
                <TouchableOpacity key={task.id} style={styles.taskCard}>
                  <View style={styles.taskIcon}>
                    {task.task === 'Sulama' ? (
                      <Droplets size={16} color="#3B82F6" />
                    ) : (
                      <Calendar size={16} color="#16A34A" />
                    )}
                  </View>
                  <View style={styles.taskInfo}>
                    <Text style={styles.taskTitle}>{task.plantName}</Text>
                    <Text style={styles.taskSubtitle}>{task.task}</Text>
                  </View>
                  <Text style={styles.taskTime}>{task.time}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* My Plants */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bitki Koleksiyonum</Text>
          {myPlants.map((plant) => (
            <TouchableOpacity key={plant.id} style={styles.plantCard}>
              <Image source={{ uri: plant.image }} style={styles.plantImage} />
              
              <View style={styles.plantContent}>
                <View style={styles.plantHeader}>
                  <View>
                    <Text style={styles.plantName}>{plant.name}</Text>
                    <Text style={styles.plantType}>{plant.type}</Text>
                  </View>
                  <TouchableOpacity style={styles.moreButton}>
                    <MoreVertical size={20} color="#6B7280" />
                  </TouchableOpacity>
                </View>

                <View style={styles.healthContainer}>
                  <View style={[styles.healthBadge, { backgroundColor: getHealthColor(plant.health) + '20' }]}>
                    <View style={[styles.healthDot, { backgroundColor: getHealthColor(plant.health) }]} />
                    <Text style={[styles.healthText, { color: getHealthColor(plant.health) }]}>
                      {plant.health}
                    </Text>
                  </View>
                  <View style={styles.ownershipContainer}>
                    <Heart size={12} color="#EF4444" fill="#EF4444" />
                    <Text style={styles.ownershipText}>{plant.daysOwned} gündür</Text>
                  </View>
                </View>

                <View style={styles.plantDetails}>
                  <View style={styles.detailItem}>
                    <Droplets size={14} color="#3B82F6" />
                    <Text style={styles.detailText}>Son: {plant.lastWatered}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Calendar size={14} color="#16A34A" />
                    <Text style={styles.detailText}>Sonraki: {plant.nextWatering}</Text>
                  </View>
                </View>

                {plant.notes && (
                  <View style={styles.notesContainer}>
                    <Text style={styles.notesText}>💭 {plant.notes}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add Plant CTA */}
        <TouchableOpacity style={styles.addPlantCTA}>
          <LinearGradient
            colors={['#22C55E', '#16A34A']}
            style={styles.ctaGradient}
          >
            <Plus size={24} color="#FFFFFF" />
            <Text style={styles.ctaText}>Yeni Bitki Ekle</Text>
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
  addButton: {
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
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#16A34A',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  tasksContainer: {
    gap: 8,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  taskIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  taskSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  taskTime: {
    fontSize: 12,
    fontWeight: '500',
    color: '#16A34A',
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
    height: 140,
  },
  plantContent: {
    padding: 16,
  },
  plantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  plantName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  plantType: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  moreButton: {
    padding: 4,
  },
  healthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  healthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  healthDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  healthText: {
    fontSize: 12,
    fontWeight: '600',
  },
  ownershipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ownershipText: {
    fontSize: 12,
    color: '#6B7280',
  },
  plantDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    color: '#6B7280',
  },
  notesContainer: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  notesText: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  addPlantCTA: {
    marginHorizontal: 20,
    marginBottom: 32,
    borderRadius: 12,
    overflow: 'hidden',
  },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});