import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";

type TermAndConditionModalProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

export default function TermAndConditionModal({
    open,
    onClose,
    onConfirm,
}: TermAndConditionModalProps) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold" }}>
            Terms and Conditions
        </DialogTitle>
        <DialogContent dividers>
            <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                🔹 Article 1. Scope of Application
            </Typography>
            <List dense sx={{ pl: 2 }}>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                <ListItemText
                    primary="Applies to all students and postgraduate learners approved to stay in the dormitory (hereinafter referred to as 'students')."
                    primaryTypographyProps={{ variant: "body2" }}
                />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                <ListItemText
                    primary="International students and other special groups are subject to separate regulations."
                    primaryTypographyProps={{ variant: "body2" }}
                />
                </ListItem>
            </List>

            <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, mb: 1, mt: 2 }}
            >
                🔹 Article 2. General Provisions
            </Typography>
            <List dense sx={{ pl: 2 }}>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                <ListItemText
                    primary="Students must complete registration procedures and pay the dormitory fee on time."
                    primaryTypographyProps={{ variant: "body2" }}
                />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                <ListItemText
                    primary="Students staying in Dormitory B must sign a rental agreement with the Student Services Center (SSC)."
                    primaryTypographyProps={{ variant: "body2" }}
                />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                <ListItemText
                    primary="Accommodation is arranged at the beginning of each academic year and is valid for that year only."
                    primaryTypographyProps={{ variant: "body2" }}
                />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                <ListItemText
                    primary="If the dormitory fee is not paid on time, the system will cancel the assigned room."
                    primaryTypographyProps={{ variant: "body2" }}
                />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                <ListItemText
                    primary="Each student is issued a Dormitory Registration Card, which must be presented when requested."
                    primaryTypographyProps={{ variant: "body2" }}
                />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                <ListItemText
                    primary="Guests staying overnight must be registered with the dormitory office or security team and will be assigned to a separate area."
                    primaryTypographyProps={{ variant: "body2" }}
                />
                </ListItem>
            </List>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, mt: 2 }}>
                🔹 Article 3. Rules of Conduct
            </Typography>
            <List dense sx={{ pl: 2 }}>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                    <ListItemText
                        primary="Students must carry their Student ID when entering or leaving the dormitory."
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                    <ListItemText
                        primary="Quiet hours: 12:00–13:00 and 23:00–05:00. No noise during these periods."
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                    <ListItemText
                        primary="No visiting opposite-gender areas or receiving guests inside dorm rooms."
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                    <ListItemText
                        primary="No smoking indoors or in public areas."
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                    <ListItemText
                        primary="No curtains around beds; personal belongings must be kept tidy."
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                    <ListItemText
                        primary="No sports activities except in designated areas."
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                    <ListItemText
                        primary="Alcohol consumption and cooking in rooms are prohibited (except in permitted areas of Dormitory A)."
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                    <ListItemText
                        primary="Students leaving for less than 5 days must inform the room monitor; over 5 days must be reported to the supervisor."
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </ListItem>
            </List>

            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, mt: 2 }}>
                🔹 Article 4. Use of Dormitory Room
            </Typography>
            <List dense sx={{ pl: 2 }}>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                    <ListItemText
                        primary="Do not move or alter room furnishings or structure."
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                    <ListItemText
                        primary="Do not install additional furniture that affects shared space."
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                    <ListItemText
                        primary="Students are responsible for preserving shared assets; damage must be reported and compensated."
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                    <ListItemText
                        primary="Keep valuables secure; avoid storing unnecessary expensive items."
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                    <ListItemText
                        primary="Misuse of fire safety equipment is strictly prohibited."
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                    <ListItemText
                        primary="Internet (Wi-Fi) must be used according to regulations."
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                    <ListItemText
                        primary="Allowed electrical devices include:"
                        primaryTypographyProps={{ variant: "body2", fontWeight: 500 }}
                    />
                </ListItem>
                <List dense sx={{ pl: 4, mb: 1 }}>
                    <ListItem sx={{ display: "list-item", pl: 2 }}>
                        <ListItemText
                            primary="Computers, printers for study purposes;"
                            primaryTypographyProps={{ variant: "body2" }}
                        />
                    </ListItem>
                    <ListItem sx={{ display: "list-item", pl: 2 }}>
                        <ListItemText
                            primary="Low-power appliances (e.g., under 1,000W kettles, irons);"
                            primaryTypographyProps={{ variant: "body2" }}
                        />
                    </ListItem>
                    <ListItem sx={{ display: "list-item", pl: 2 }}>
                        <ListItemText
                            primary="Desk fans, light bulbs;"
                            primaryTypographyProps={{ variant: "body2" }}
                        />
                    </ListItem>
                    <ListItem sx={{ display: "list-item", pl: 2 }}>
                        <ListItemText
                            primary="Other low-power study-related devices."
                            primaryTypographyProps={{ variant: "body2" }}
                        />
                    </ListItem>
                </List>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                    <ListItemText
                        primary="Upon moving out, students must clean, return all items, and restore the room to its original state."
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </ListItem>
            </List>

            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, mt: 2 }}>
                🔹 Article 5. Hygiene and Environmental Care
            </Typography>
            <List dense sx={{ pl: 2 }}>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                    <ListItemText
                        primary="Students must clean and organize their rooms and nearby common areas."
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                    <ListItemText
                        primary="Trash must be disposed of in designated areas."
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                    <ListItemText
                        primary="Actively participate in environmental clean-up activities."
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                    <ListItemText
                        primary="No worship altars, pets, or plants allowed in rooms or hallways."
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </ListItem>
            </List>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, mt: 2 }}>
                🔹 Article 6. Security and Order
            </Typography>
            <List dense sx={{ pl: 2 }}>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                    <ListItemText
                        primary="Maintain security and report suspicious activities."
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                    <ListItemText
                        primary="Strictly prohibited:"
                        primaryTypographyProps={{ variant: "body2", fontWeight: 500 }}
                    />
                </ListItem>
                <List dense sx={{ pl: 4, mb: 1 }}>
                    <ListItem sx={{ display: "list-item", pl: 2 }}>
                        <ListItemText
                            primary="Protesting, inciting, distributing illegal materials;"
                            primaryTypographyProps={{ variant: "body2" }}
                        />
                    </ListItem>
                    <ListItem sx={{ display: "list-item", pl: 2 }}>
                        <ListItemText
                            primary="Possession or sale of weapons, explosives, banned goods;"
                            primaryTypographyProps={{ variant: "body2" }}
                        />
                    </ListItem>
                    <ListItem sx={{ display: "list-item", pl: 2 }}>
                        <ListItemText
                            primary="Storing or distributing pornographic content, participating in superstitious or unauthorized religious activities;"
                            primaryTypographyProps={{ variant: "body2" }}
                        />
                    </ListItem>
                    <ListItem sx={{ display: "list-item", pl: 2 }}>
                        <ListItemText
                            primary="Drug use and trafficking;"
                            primaryTypographyProps={{ variant: "body2" }}
                        />
                    </ListItem>
                    <ListItem sx={{ display: "list-item", pl: 2 }}>
                        <ListItemText
                            primary="Gambling, prostitution;"
                            primaryTypographyProps={{ variant: "body2" }}
                        />
                    </ListItem>
                    <ListItem sx={{ display: "list-item", pl: 2 }}>
                        <ListItemText
                            primary="Harboring criminals or stolen goods;"
                            primaryTypographyProps={{ variant: "body2" }}
                        />
                    </ListItem>
                    <ListItem sx={{ display: "list-item", pl: 2 }}>
                        <ListItemText
                            primary="Fighting or causing disturbances;"
                            primaryTypographyProps={{ variant: "body2" }}
                        />
                    </ListItem>
                    <ListItem sx={{ display: "list-item", pl: 2 }}>
                        <ListItemText
                            primary="Bringing unauthorized persons into the dorm."
                            primaryTypographyProps={{ variant: "body2" }}
                        />
                    </ListItem>
                </List>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                    <ListItemText
                        primary="Students should report issues to SSC and avoid participating in collective petitions."
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </ListItem>
            </List>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, mt: 2 }}>
                🔹 Article 7. Dormitory Parking Regulations
            </Typography>
            <List dense sx={{ pl: 2 }}>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                    <ListItemText
                        primary="Bicycle parking is free for residents; motorbikes/electric bikes require a fee."
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                    <ListItemText
                        primary="Each student may register only one vehicle for the regular rate; additional vehicles are charged as visitors."
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                    <ListItemText
                        primary="During Tet and summer breaks, students must remove their vehicles for maintenance."
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                    <ListItemText
                        primary="Unclaimed vehicles after the school year may be disposed of."
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </ListItem>
            </List>

            {/* Article 8 */}
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, mt: 2 }}>
                🔹 Article 8. Electricity, Water Usage and Payment
            </Typography>
            <List dense sx={{ pl: 2 }}>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                    <ListItemText
                        primary="Rooms are equipped with electricity and water meters. Usage is recorded each semester."
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                    <ListItemText
                        primary="Monthly readings are reported by a room representative and verified by supervisors."
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                    <ListItemText
                        primary="Late reporting may result in estimated charges."
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                    <ListItemText
                        primary="Fees must be paid on time each month."
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 2 }}>
                    <ListItemText
                        primary="Any malfunction of meters must be reported immediately. Failure to do so may result in liability for any losses."
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </ListItem>
            </List>
            </Box>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} variant="outlined">
            Cancel
            </Button>
            <Button onClick={onConfirm} variant="contained">
            I Agree
            </Button>
        </DialogActions>
        </Dialog>
    );
}
