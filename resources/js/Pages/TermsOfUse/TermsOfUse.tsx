import React from 'react';
import { Box, Typography, Container, Stack } from '@mui/material';
import Navbar from '@/Components/Navbar'; // Adjust this import based on your actual project structure

export default function TermsOfUse() {
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
                        Terms of Use
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
                        Please read these Terms of Use carefully before accessing or using our website, content, and services.
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
                            <strong>1. Acceptance of Terms</strong><br/>
                            By accessing or using this website (“Site”) and any associated content, services, features, or applications (collectively, the “Services”), you agree to be bound by these Terms of Use (“Terms”) and all applicable laws. If you do not agree to these Terms, please refrain from using the Services.
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
                            <strong>2. Changes to Terms</strong><br/>
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will post the most recent version on the Site. Your continued use of the Services after the posting of any changes constitutes your acceptance of those changes.
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
                            <strong>3. Use of Services</strong><br/>
                            You agree to use the Services only for lawful purposes and in accordance with these Terms. You must not:
                            <ul>
                                <li>Use the Services in any manner that could disable, overburden, damage, or impair the Site or interfere with any other party’s use of the Services.</li>
                                <li>Attempt to gain unauthorized access to any portion of the Services, accounts, or networks connected to the Services.</li>
                                <li>Upload or transmit any material that contains software viruses or any other harmful computer code.</li>
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
                            <strong>4. Intellectual Property Rights</strong><br/>
                            All content, including text, graphics, logos, images, and software, is the property of the Site owner or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works from any content without express written permission.
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
                            <strong>5. User Conduct</strong><br/>
                            You agree not to use the Services to harass, abuse, insult, harm, defame, slander, or otherwise violate the legal rights of others. We reserve the right to terminate your access to the Services if we determine that you have violated these Terms or any applicable law.
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
                            <strong>6. Privacy and Data Protection (GDPR / RGPD)</strong><br/>
                            We are committed to protecting your privacy and complying with the General Data Protection Regulation (GDPR) and all applicable data protection laws. We only process personal data where we have a lawful basis to do so and in accordance with our Privacy Policy. By using our Services, you acknowledge and agree that we may collect, use, and store your personal information as described in our Privacy Policy.<br/><br/>
                            Your rights under the GDPR include the right to access, rectify, or erase your personal data, and the right to object to or restrict certain processing activities. For more information on how we handle your personal data and how you can exercise your rights, please consult our Privacy Policy.
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
                            <strong>7. Cookies and Tracking Technologies</strong><br/>
                            We use cookies and similar tracking technologies to enhance your user experience, analyze site usage, and assist in our marketing efforts. By using our Services, you consent to the use of cookies in accordance with our Cookie Policy. You can withdraw your consent or manage your cookie preferences at any time.
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
                            <strong>8. Disclaimers</strong><br/>
                            The Services and all content are provided on an “as is” and “as available” basis without warranties of any kind, either express or implied. We do not warrant that the Services will be uninterrupted, error-free, or free of harmful components.
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
                            <strong>9. Limitation of Liability</strong><br/>
                            To the fullest extent permitted by law, we shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of the Services or inability to use the Services.
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
                            <strong>10. Indemnification</strong><br/>
                            You agree to indemnify, defend, and hold harmless us and our affiliates from any claims, liabilities, damages, judgments, awards, losses, costs, or expenses resulting from your use of the Services or your violation of these Terms.
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
                            <strong>11. Governing Law and Jurisdiction</strong><br/>
                            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which we are established, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in that jurisdiction.
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
                            <strong>12. Severability</strong><br/>
                            If any provision of these Terms is deemed unlawful, void, or for any reason unenforceable, that provision shall be deemed severable from these Terms and shall not affect the validity and enforceability of any remaining provisions.
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
                            <strong>13. Entire Agreement</strong><br/>
                            These Terms, along with any policies referenced herein (including our Privacy Policy and Cookie Policy), constitute the entire agreement between you and us regarding the use of our Services and supersede all prior agreements and understandings.
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
                            <strong>14. Contact Information</strong><br/>
                            If you have any questions about these Terms, please contact us at [Contact Email/Address]. We welcome your feedback and concerns, and we are committed to addressing any issues promptly and professionally.
                        </Typography>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
}
