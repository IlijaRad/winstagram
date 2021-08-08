import {useEffect} from 'react';
import Header from '../components/header';
import Timeline from '../components/timeline';
import Sidebar from '../components/sidebar/';


export default function Dashboard() {
    useEffect(() => {
        document.title = 'Instagram';
    }, [])
    return (
        <div className="bg-gray-background">
            <Header />
            <div className="flex justify-center lg:grid lg:grid-cols-3 lg:gap-4 lg:justify-between lg:mx-auto max-w-screen-lg">
                <Timeline />
                <Sidebar />
            </div>
        </div>
    )
}