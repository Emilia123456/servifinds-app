import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { getUserProfile, updateUserProfile } from "../service/userService";
import * as ImagePicker from "expo-image-picker";
import { getCategories } from "../service/offersService";
import { SelectList } from "react-native-dropdown-select-list";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({ navigation }) {
  const [Trabajos, setTrabajos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [userProfile, setUserProfile] = useState({
    nombre: "",
    apellido: "",
    email: "",
    direccion: "",
    foto: "",
    FechaNacimiento: "",
  });

  const [newJob, setNewJob] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    categoria: "",
    tags: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const categoriesData = await getCategories();
        if (Array.isArray(categoriesData)) {
          const formattedCategories = categoriesData.map((category) => ({
            key: category.id,
            value: category.nombre,
          }));
          setCategories(formattedCategories);
        } else if (categoriesData?.data) {
          const formattedCategories = categoriesData.data.map((category) => ({
            key: category.id,
            value: category.nombre,
          }));
          setCategories(formattedCategories);
        } else {
          console.error("Formato de categorías inesperado:", categoriesData);
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    loadData();
  }, []);
  const API_URL = "https://diverse-tightly-mongoose.ngrok-free.app";

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await getUserProfile();
        if (profileData) {
          setUserProfile(profileData);
        }
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleInputChange = (name, value) => {
    setNewJob({ ...newJob, [name]: value });
  };

  const handlePublishJob = async () => {
    if (
      !newJob.descripcion ||
      !newJob.precio ||
      !newJob.idcategoria ||
      !newJob.titulo
    ) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        alert(
          "No se encontró un token de autenticación. Por favor, inicia sesión."
        );
        return;
      }

      const response = await fetch(`${API_URL}/api/Ofrecimientos/ofrecidos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          titulo: newJob.titulo,
          descripcion: newJob.descripcion,
          precio: parseFloat(newJob.precio),
          idcategoria: newJob.idcategoria,
          tags: newJob.tags,
        }),
      });

      if (response.ok) {
        alert("Trabajo publicado con éxito.");
        setNewJob({
          titulo: "",
          descripcion: "",
          precio: "",
          idcategoria: "",
          tags: "",
        });
        closeModal();
      } else {
        const errorData = await response.json();
        console.error("Error al publicar trabajo:", errorData);
        alert(
          `Error al publicar: ${errorData.errors.map((e) => e.msg).join(", ")}`
        );
      }
    } catch (error) {
      console.error("Error al enviar datos al servidor:", error);
      alert("No se pudo conectar al servidor. Inténtalo más tarde.");
    }
  };

  const handleChangeProfilePicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Se necesitan permisos para acceder a la galería");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      try {
        const response = await updateUserProfile(
          userProfile.email,
          selectedImageUri
        );
        if (response.success) {
          setUserProfile((prevState) => ({
            ...prevState,
            foto: selectedImageUri,
          }));
        } else {
          alert("Error al cambiar la foto");
        }
      } catch (error) {
        console.error("Error al actualizar la foto de perfil:", error);
        alert("Hubo un error al actualizar la foto");
      }
    }
  };

  const getUserJobs = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        alert(
          "No se encontró un token de autenticación. Por favor, inicia sesión."
        );
        return;
      }
      const response = await fetch(`${API_URL}/api/Ofrecimientos/id`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        return data;
      } else {
        console.error("La respuesta no es un array:", data);
        alert("Error al obtener los trabajos");
      }
    } catch (error) {
      console.error("Error al obtener los trabajos:", error);
      alert("No se pudo conectar al servidor. Inténtalo más tarde.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await getUserProfile();
        if (profileData) {
          setUserProfile(profileData);
        }
  
        const jobsData = await getUserJobs();
        if (Array.isArray(jobsData)) {
          setTrabajos(jobsData); 
        } else {
          setTrabajos([]); 
        }
      } catch (error) {
        console.error("Error al obtener el perfil y los trabajos:", error);
        setTrabajos([]);
      }
    };
  
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={
            userProfile.foto
              ? { uri: userProfile.foto }
              : require("../assets/usuario.png")
          }
          style={styles.profileImage}
        />
        <TouchableOpacity
          onPress={handleChangeProfilePicture}
          style={styles.changePictureButton}
        >
          <Text style={styles.changePictureButtonText}>Cambiar Foto</Text>
        </TouchableOpacity>
        <View style={styles.profileInfo}>
          <Text
            style={styles.profileName}
          >{`${userProfile.nombre} ${userProfile.apellido}`}</Text>
          <Text style={styles.profileEmail}>{userProfile.email}</Text>
          <Text style={styles.profileStatus}>{userProfile.direccion}</Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>

        <TouchableOpacity style={styles.actionButton} onPress={openModal}>
          <Text style={styles.actionText}>Publicar nuevo trabajo</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Publicar nuevo trabajo</Text>

            <TextInput
              style={styles.input}
              placeholder="Título del trabajo"
              placeholderTextColor="#888"
              value={newJob.titulo}
              onChangeText={(value) => setNewJob({ ...newJob, titulo: value })}
            />

            <TextInput
              style={styles.input}
              placeholder="Descripción del trabajo"
              placeholderTextColor="#888"
              value={newJob.descripcion}
              onChangeText={(value) => handleInputChange("descripcion", value)}
            />

            <TextInput
              style={styles.input}
              placeholder="Precio"
              placeholderTextColor="#888"
              value={newJob.precio}
              keyboardType="numeric"
              onChangeText={(value) =>
                handleInputChange("precio", value.replace(/[^0-9.]/g, ""))
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Tags (separados por comas)"
              placeholderTextColor="#888"
              value={newJob.tags}
              onChangeText={(value) => setNewJob({ ...newJob, tags: value })}
            />

            <SelectList
              setSelected={(val) => {
                const selectedCategory = categories.find(
                  (category) => category.value === val
                );
                if (selectedCategory) {
                  setNewJob({ ...newJob, idcategoria: selectedCategory.key });
                }
              }}
              data={categories}
              save="value"
              placeholder="Selecciona una categoría"
            />

            <TouchableOpacity
              style={styles.publishButton}
              onPress={handlePublishJob}
            >
              <Text style={styles.publishButtonText}>Publicar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Información Personal</Text>
          <Text style={styles.infoText}>
            Fecha de Nacimiento:{" "}
            {new Date(userProfile.FechaNacimiento).toLocaleDateString()}
          </Text>
          <Text style={styles.infoText}>
            Dirección: {userProfile.direccion}
          </Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Mis Trabajos</Text>
          {Array.isArray(Trabajos) && Trabajos.length === 0 ? (
            <Text style={styles.infoText}>
              No has publicado ningún trabajo.
            </Text>
          ) : (
            Array.isArray(Trabajos) &&
            Trabajos.map((job, index) => (
              <View key={index} style={styles.jobCard}>
                <Text style={styles.jobTitle}>{job.titulo}</Text>
                <Text style={styles.jobDescription}>{job.descripcion}</Text>
                <Text style={styles.jobPrice}>${job.precio}</Text>
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff", // Fondo blanco para un diseño limpio
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 100,
    marginBottom: 20,
    padding: 10,
  },
  profileImage: {
    width: 170,
    height: 170,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: "#1B2E35", // Verde moderno
    backgroundColor: "#e9ecef",
    marginBottom:10,
  },
  changePictureButton: {
    marginTop: 10,
    backgroundColor: "#1B2E35",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  changePictureButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  profileInfo: {
    alignItems: "center",
    marginTop: 15,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  profileEmail: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  profileStatus: {
    fontSize: 14,
    color: "#888",
    marginTop: 3,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  actionButton: {
    borderColor: "#1B2E35",
    backgroundColor: "#1B2E35",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  actionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 10,

  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  publishButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 15,
  },
  publishButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#6c757d",
    paddingVertical: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 14,
  },
  infoContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  jobCard: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  jobDescription: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  jobPrice: {
    fontSize: 14,
    color: "#28a745",
    fontWeight: "bold",
  },
});
