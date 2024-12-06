import React from 'react';
import { Box, Typography, Container, Stack } from '@mui/material';
import Navbar from '@/Components/Navbar'; // Adjust the import path to match your project structure

export default function PrivacyPolicy() {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100%',
                bgcolor: '#1f6fb2',
                background: 'linear-gradient(to bottom, #3a9ed9 0%, #1f6fb2 100%)',
            }}
        >
            <Navbar />
            <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
                <Stack spacing={4}>
                    <Typography
                        variant="h3"
                        sx={{
                            color: 'white',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 700,
                            textAlign: 'center',
                            fontSize: { xs: '2rem', md: '3rem' },
                        }}
                    >
                        Privacy Policy
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#eee',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 600,
                            textAlign: 'center',
                            fontSize: { xs: '1.1rem', md: '1.3rem' },
                            maxWidth: '600px',
                            mx: 'auto',
                            lineHeight: 1.4,
                        }}
                    >
                        We value your privacy. This page outlines how we collect, use, and protect your personal information.
                    </Typography>

                    <Stack spacing={3}>
                        <Typography
                            variant="body1"
                            sx={{
                                fontFamily: 'Roboto, sans-serif',
                                color: '#f0f0f0',
                                fontSize: '1rem',
                                lineHeight: 1.8,
                                textAlign: 'justify',
                            }}
                        >
                            <strong>1. Introduction</strong><br/>
                            We are committed to safeguarding the privacy of our users (“you” or “your”). This Privacy Policy explains the types of personal data we may collect from you when you use our website and related services (collectively, the “Services”), how we process that data, and the measures we take to protect it.
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                fontFamily: 'Roboto, sans-serif',
                                color: '#f0f0f0',
                                fontSize: '1rem',
                                lineHeight: 1.8,
                                textAlign: 'justify',
                            }}
                        >
                            <strong>2. Personal Data We Collect</strong><br/>
                            We may collect various categories of personal data including, but not limited to:
                            <ul>
                                <li>Contact information such as name, email address, and postal address.</li>
                                <li>Browsing behavior, IP address, and information about your device and operating system.</li>
                                <li>Any information you voluntarily provide when contacting us, subscribing to newsletters, or filling out forms.</li>
                            </ul>
                            We collect this data only when we have a lawful basis to do so, for example, when you provide consent or when processing is necessary for the performance of a contract.
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                fontFamily: 'Roboto, sans-serif',
                                color: '#f0f0f0',
                                fontSize: '1rem',
                                lineHeight: 1.8,
                                textAlign: 'justify',
                            }}
                        >
                            <strong>3. How We Use Your Personal Data</strong><br/>
                            We use your personal data for:
                            <ul>
                                <li>Providing and improving our Services.</li>
                                <li>Responding to your inquiries and requests.</li>
                                <li>Personalizing your user experience.</li>
                                <li>Sending you marketing communications if you have opted-in.</li>
                                <li>Ensuring compliance with legal obligations and protecting our legitimate interests.</li>
                            </ul>
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                fontFamily: 'Roboto, sans-serif',
                                color: '#f0f0f0',
                                fontSize: '1rem',
                                lineHeight: 1.8,
                                textAlign: 'justify',
                            }}
                        >
                            <strong>4. GDPR / RGPD Compliance</strong><br/>
                            Under the General Data Protection Regulation (GDPR), you have certain rights regarding your personal data, including the right to:
                            <ul>
                                <li>Access, rectify, or erase your personal data.</li>
                                <li>Restrict or object to certain data processing activities.</li>
                                <li>Withdraw consent where processing is based on consent.</li>
                                <li>Data portability, allowing you to receive your personal data in a structured, commonly used, and machine-readable format.</li>
                            </ul>
                            To exercise these rights, please contact us using the details provided in the “Contact Us” section below.
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                fontFamily: 'Roboto, sans-serif',
                                color: '#f0f0f0',
                                fontSize: '1rem',
                                lineHeight: 1.8,
                                textAlign: 'justify',
                            }}
                        >
                            <strong>5. Data Storage and Security</strong><br/>
                            We take appropriate technical and organizational measures to secure your personal data from unauthorized access, use, alteration, and destruction. We store your data on secure servers and limit access to authorized personnel only. However, no method of transmission over the internet or electronic storage is completely secure, so we cannot guarantee absolute security.
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                fontFamily: 'Roboto, sans-serif',
                                color: '#f0f0f0',
                                fontSize: '1rem',
                                lineHeight: 1.8,
                                textAlign: 'justify',
                            }}
                        >
                            <strong>6. Cookies and Similar Technologies</strong><br/>
                            We use cookies and similar tracking technologies to personalize your experience, analyze usage, and improve our Services. You can manage your cookie preferences or withdraw consent at any time by adjusting your browser settings or contacting us.
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                fontFamily: 'Roboto, sans-serif',
                                color: '#f0f0f0',
                                fontSize: '1rem',
                                lineHeight: 1.8,
                                textAlign: 'justify',
                            }}
                        >
                            <strong>7. Third-Party Services</strong><br/>
                            We may share your data with third-party service providers who assist us in operating our Services, conducting business, or servicing you, provided those parties agree to keep this information confidential and comply with all relevant data protection regulations.
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                fontFamily: 'Roboto, sans-serif',
                                color: '#f0f0f0',
                                fontSize: '1rem',
                                lineHeight: 1.8,
                                textAlign: 'justify',
                            }}
                        >
                            <strong>8. International Data Transfers</strong><br/>
                            Your personal data may be transferred to and processed in countries other than the one in which you reside. In such cases, we ensure that appropriate safeguards (such as standard contractual clauses) are in place to protect your personal data in accordance with applicable laws.
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                fontFamily: 'Roboto, sans-serif',
                                color: '#f0f0f0',
                                fontSize: '1rem',
                                lineHeight: 1.8,
                                textAlign: 'justify',
                            }}
                        >
                            <strong>9. Retention of Personal Data</strong><br/>
                            We retain your personal data only for as long as necessary to fulfill the purposes for which we collected it, including for the purposes of satisfying any legal, accounting, or reporting requirements.
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                fontFamily: 'Roboto, sans-serif',
                                color: '#f0f0f0',
                                fontSize: '1rem',
                                lineHeight: 1.8,
                                textAlign: 'justify',
                            }}
                        >
                            <strong>10. Children’s Privacy</strong><br/>
                            Our Services are not intended for children under the age of 16, and we do not knowingly collect personal data from children. If you believe that a child under 16 has provided us with personal data, please contact us so that we may delete the data.
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                fontFamily: 'Roboto, sans-serif',
                                color: '#f0f0f0',
                                fontSize: '1rem',
                                lineHeight: 1.8,
                                textAlign: 'justify',
                            }}
                        >
                            <strong>11. Changes to This Privacy Policy</strong><br/>
                            We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised “Last Updated” date. Your continued use of the Services after any changes signifies your acceptance of the updated policy.
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                fontFamily: 'Roboto, sans-serif',
                                color: '#f0f0f0',
                                fontSize: '1rem',
                                lineHeight: 1.8,
                                textAlign: 'justify',
                            }}
                        >
                            <strong>12. Contact Us</strong><br/>
                            If you have any questions or concerns about this Privacy Policy, or if you wish to exercise your rights regarding your personal data, please contact us at [Your Contact Email/Address].
                        </Typography>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
}
