import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">
                    Settings
                </h1>
                <p className="text-muted-foreground">
                    Manage your account and app preferences.
                </p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Coming Soon</CardTitle>
                    <CardDescription>
                        This page is under construction. Check back later for more settings!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>We are working hard to bring you more ways to customize your DeepFlow experience.</p>
                </CardContent>
            </Card>
        </div>
    );
}
