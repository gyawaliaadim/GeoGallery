import { Colors } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
interface BackgroundProps {
    children: React.ReactNode;
}

const MainView: React.FC<BackgroundProps> = ({ children }) => {
    return (<>
        
            
        <LinearGradient
            // Background Linear Gradient
            colors={[Colors.primary200, Colors.primary400]}
            style={styles.background}

        >
            <ImageBackground
                source={require('@/assets/images/background.jpg')}
                resizeMethod='auto'
                style={styles.background}
                imageStyle={{ opacity: 0.75 }} // Adjust opacity of the background image
            >
                <SafeAreaView style={styles.background}>
                    {/* SafeAreaView to ensure content is within safe area boundaries */}
                    {children}
                </SafeAreaView>
            </ImageBackground>
        </LinearGradient>
        </>
    );
}

export default MainView

const styles = StyleSheet.create({
    background: {
        flex: 1,
    }
})