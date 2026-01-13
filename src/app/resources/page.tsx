"use client";

import { useState } from "react";
import { getAppData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Headphones, Video, FileText, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ResourcesPage() {
    const data = getAppData();
    const [filter, setFilter] = useState("All");

    const categories = ["All", "Article", "Video", "Audio"];

    const filteredResources = filter === "All"
        ? data.resources
        : data.resources.filter(r => r.type === filter);

    const getIcon = (type: string) => {
        switch (type) {
            case "Article": return <FileText className="h-5 w-5" />;
            case "Video": return <Video className="h-5 w-5" />;
            case "Audio": return <Headphones className="h-5 w-5" />;
            default: return <BookOpen className="h-5 w-5" />;
        }
    };

    return (
        <div className="min-h-screen bg-muted/5 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold tracking-tight mb-4">Mental Health Library</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Explore our curated collection of articles, guided meditations, and expert videos to help you manage specific challenges.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {categories.map(cat => (
                        <Button
                            key={cat}
                            variant={filter === cat ? "default" : "outline"}
                            onClick={() => setFilter(cat)}
                            className="rounded-full px-6"
                        >
                            {cat}
                        </Button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map(resource => (
                        <Card key={resource.id} className="hover:shadow-md transition-all group cursor-pointer border-primary/10">
                            <CardHeader>
                                <div className="flex justify-between items-start mb-2">
                                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                                        {resource.category}
                                    </Badge>
                                    <div className="text-muted-foreground group-hover:text-primary transition-colors">
                                        {getIcon(resource.type)}
                                    </div>
                                </div>
                                <CardTitle className="line-clamp-2">{resource.title}</CardTitle>
                                <CardDescription>{resource.type} • {resource.readTime || resource.duration}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground line-clamp-3">
                                    {resource.content || "Click to view this resource content..."}
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="ghost" className="w-full justify-between group-hover:bg-primary group-hover:text-white transition-colors">
                                    View Resource <ExternalLink className="h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
