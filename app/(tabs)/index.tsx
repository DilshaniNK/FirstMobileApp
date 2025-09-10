import {Animated, Image, Text, View, ScrollView, ActivityIndicator, FlatList} from "react-native";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import SearchBar from "@/component/searchBar";
import {useRouter} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import MovieCard from "@/component/movieCard";


export default function Index() {
    const router = useRouter();
    const{
        data: movies,
        loading: moviesLoading,
        error: moviesErorr
    } = useFetch(()=>fetchMovies({query: ''}));

  // @ts-ignore
    return (
    <View className="flex-1 bg-primary ">
        <Image
            source={images.bg}
            className="absolute w-full z-0"

        />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
             paddingBottom: 10,paddingHorizontal: 20
        }}>
            <Image source={icons.logo}  className="w-12 h-10 mt-20 mb-5 mx-auto"/>
            {moviesLoading ? (
                <ActivityIndicator
                    size="large"
                    color="#0000ff"
                    className="mt-10 self-center"
                />
            ): moviesErorr ? (
                <Text>Error: {moviesErorr?.message}</Text>
            ):(
                <View className="mt-5">
                    <SearchBar
                        onPress = {()=> router.push("/search")}
                        placeholder ="Search for a movie"
                    />
                    <>
                        <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
                        <FlatList
                            data={movies}
                            renderItem={({item})=>(
                                <MovieCard
                                    {...item}
                                />
                            )}
                            keyExtractor={(item)=>item.id.toString()}
                            numColumns={3}
                            columnWrapperStyle={{
                                justifyContent: 'flex-start',
                                gap: 15,
                                paddingRight: 5,
                                marginBottom: 10
                            }}
                            className="mt-2 pb-32"
                            scrollEnabled={false}
                        />


                    </>
                </View>

            )}

        </ScrollView>


    </View>
  );
}
