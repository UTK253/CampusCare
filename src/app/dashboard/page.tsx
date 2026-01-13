"use client";

import { getAppData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Smile, BookOpen, Clock, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const { user } = getAppData();
    const router = useRouter();

    return (
        <div className="min-h-screen bg-muted/5 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Hello, {user.name}</h1>
                        <p className="text-muted-foreground">Welcome to your wellness dashboard.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/settings"><Settings className="h-4 w-4 mr-2" /> Settings</Link>
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => router.push("/")}>
                            <LogOut className="h-4 w-4 mr-2" /> Sign Out
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-primary/5 border-primary/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Daily Mood</CardTitle>
                            <Smile className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Good</div>
                            <p className="text-xs text-muted-foreground">+2 streak days</p>
                            <Button variant="link" className="p-0 h-auto text-xs mt-2 text-primary">Log today's mood</Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Appointments</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{user.appointments.filter(a => a.status !== 'Completed').length} Upcoming</div>
                            <p className="text-xs text-muted-foreground">Next: No upcoming sessions</p>
                            <Button variant="link" className="p-0 h-auto text-xs mt-2" asChild><Link href="/booking">Book New</Link></Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Saved Resources</CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3 Items</div>
                            <p className="text-xs text-muted-foreground">Last read: Grounding...</p>
                            <Button variant="link" className="p-0 h-auto text-xs mt-2" asChild><Link href="/resources">View Library</Link></Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Appointment History</CardTitle>
                            <CardDescription>Your past counseling sessions.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {user.appointments.map(apt => (
                                    <div key={apt.id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-muted p-2 rounded-full">
                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Session with Dr. Sarah Chen</p>
                                                <p className="text-sm text-muted-foreground">{new Date(apt.date).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="text-sm font-medium bg-green-100 text-green-700 px-2 py-1 rounded">
                                            {apt.status}
                                        </div>
                                    </div>
                                ))}
                                {user.appointments.length === 0 && <p className="text-center text-muted-foreground py-4">No history found.</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recommended for You</CardTitle>
                            <CardDescription>Based on your recent check-in.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">You recently reported feeling stressed. Here are some quick exercises:</p>
                                <div className="grid gap-2 mt-4">
                                    <Button variant="outline" className="justify-start h-auto py-3">
                                        <div className="text-left">
                                            <div className="font-semibold">5-Minute Breathing</div>
                                            <div className="text-xs text-muted-foreground">Audio Guide</div>
                                        </div>
                                    </Button>
                                    <Button variant="outline" className="justify-start h-auto py-3">
                                        <div className="text-left">
                                            <div className="font-semibold">Exam Anxiety Tips</div>
                                            <div className="text-xs text-muted-foreground">Article</div>
                                        </div>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
