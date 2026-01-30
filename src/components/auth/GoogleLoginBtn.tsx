import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from '@/contexts/AuthContext';

const GoogleLoginBtn = () => {
    const { user, logout } = useAuth();
    const [showDisclaimer, setShowDisclaimer] = useState(false);
    const [acknowledged, setAcknowledged] = useState(false);

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                }).then(res => res.json());

                const userData = {
                    name: userInfo.name,
                    email: userInfo.email,
                    picture: userInfo.picture
                };

                // Store directly in localStorage - AuthContext will pick it up on refresh
                localStorage.setItem('user', JSON.stringify(userData));

                // Force page reload to sync with AuthContext
                window.location.reload();
            } catch (error) {
                console.error("Login Failed", error);
            }
        },
        onError: () => console.log('Login Failed'),
    });

    const handleLoginClick = () => {
        setShowDisclaimer(true);
    };

    const handleProceedToLogin = () => {
        if (acknowledged) {
            setShowDisclaimer(false);
            setAcknowledged(false);
            login();
        }
    };

    if (user) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user.picture} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.name}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {user.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <>
            <Button variant="default" size="sm" onClick={handleLoginClick}>
                LOGIN
            </Button>

            <Dialog open={showDisclaimer} onOpenChange={setShowDisclaimer}>
                <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="font-mono text-xl">Disclaimer</DialogTitle>
                        <DialogDescription className="text-sm">
                            Please read and acknowledge the following before proceeding
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <p className="text-sm leading-relaxed">
                            All attendees enter and engage at their own risk; CEL and E-Week assume no liability for personal or financial outcomes.
                        </p>

                        <ol className="text-sm space-y-3 list-decimal pl-5">
                            <li>Official events are 100% free; any payments or capital committed are made solely of your own accord.</li>
                            <li>Organizers are not accountable for any fiscal losses, bad investments, or data breaches involving third-party entities.</li>
                            <li>Platform presence does not equal financial or legal advice.</li>
                            <li>BITS Pilani, CEL, and E-Week are fully indemnified against all consequential damages arising from event attendance.</li>
                        </ol>

                        <div className="flex items-start space-x-3 pt-4 border-t">
                            <Checkbox
                                id="acknowledge"
                                checked={acknowledged}
                                onCheckedChange={(checked) => setAcknowledged(checked === true)}
                            />
                            <label
                                htmlFor="acknowledge"
                                className="text-sm font-medium leading-relaxed cursor-pointer"
                            >
                                I have read and acknowledge the above disclaimer and agree to proceed at my own risk.
                            </label>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setShowDisclaimer(false);
                                setAcknowledged(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleProceedToLogin}
                            disabled={!acknowledged}
                            className="font-mono"
                        >
                            Proceed to Login
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default GoogleLoginBtn;