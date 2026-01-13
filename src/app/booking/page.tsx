"use client";

import { useState } from "react";
import { getAppData, Counselor } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Search, Star, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function BookingPage() {
    const data = getAppData();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSpecialty, setSelectedSpecialty] = useState("All");

    // Extract unique specialties
    const specialties = ["All", ...Array.from(new Set(data.counselors.map(c => c.specialty)))];

    const filteredCounselors = data.counselors.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.bio.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecialty = selectedSpecialty === "All" || c.specialty === selectedSpecialty;
        return matchesSearch && matchesSpecialty;
    });

    const handleBookSlot = (counselorName: string, slot: string) => {
        alert(`Appointment Confirmed!\n\nCounselor: ${counselorName}\nTime: ${slot}\n\nA confirmation email has been sent to your student address.`);
    };

    return (
        <div className="min-h-screen bg-muted/5 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
                        Find the Right Support for You
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Browse our licensed counselors and book a session that fits your schedule. All sessions are confidential.
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-background p-6 rounded-xl shadow-sm border mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-1/3">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by name or keyword..."
                            className="w-full pl-9 pr-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <label className="text-sm font-medium whitespace-nowrap">Filter by:</label>
                        <select
                            className="px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-48"
                            value={selectedSpecialty}
                            onChange={(e) => setSelectedSpecialty(e.target.value)}
                        >
                            {specialties.map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Counselors Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredCounselors.map((counselor) => (
                        <Card key={counselor.id} className="overflow-hidden hover:shadow-md transition-shadow">
                            <div className="flex flex-col sm:flex-row">
                                {/* Counselor Image Placeholder */}
                                <div className="h-48 sm:h-auto sm:w-48 bg-muted flex items-center justify-center shrink-0">
                                    <img src={counselor.image} alt={counselor.name} className="h-32 w-32 rounded-full object-cover bg-white" />
                                </div>

                                <div className="flex-1 flex flex-col">
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-xl mb-1">{counselor.name}</CardTitle>
                                                <CardDescription className="flex items-center gap-1 text-primary font-medium">
                                                    {counselor.specialty}
                                                </CardDescription>
                                            </div>
                                            <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">
                                                <Star className="h-3 w-3 fill-current" />
                                                {counselor.rating}
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                            {counselor.bio}
                                        </p>
                                    </CardHeader>

                                    <CardContent className="mt-auto">
                                        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                            <Clock className="h-4 w-4" /> Available Slots
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {counselor.availableSlots.map(slot => (
                                                <Button
                                                    key={slot}
                                                    variant="secondary"
                                                    size="sm"
                                                    className="text-xs h-8"
                                                    onClick={() => handleBookSlot(counselor.name, slot)}
                                                >
                                                    {slot}
                                                </Button>
                                            ))}
                                        </div>
                                    </CardContent>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {filteredCounselors.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        No counselors found matching your criteria. Try adjusting the filters.
                    </div>
                )}
            </div>
        </div>
    );
}
