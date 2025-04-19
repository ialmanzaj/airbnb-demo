import React from 'react';
import { View, Text } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
    return (
        <View className={styles.container}>
            <Icon size={48} className="text-gray-400" />
            <Text className={styles.title}>{title}</Text>
            <Text className={styles.description}>{description}</Text>
        </View>
    );
}

const styles = {
    container: 'flex-1 items-center justify-center py-12 px-5',
    title: 'text-lg font-semibold text-gray-900 mt-4 mb-2',
    description: 'text-base text-gray-500 text-center',
}; 