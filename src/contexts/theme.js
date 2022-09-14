import { ThemeProvider } from "styled-components";


export const ThemeContextWrapper = ({ children }) => {

    const theme = {

        //  Colors

        colors: {
            //  Primary
            scissorsGradient: 'linear-gradient(hsl(39, 89%, 49%), hsl(40, 84%, 53%))',
            paperGradient: 'linear-gradient(hsl(230, 89%, 62%), hsl(230, 89%, 65%))',
            rockGradient: 'linear-gradient(hsl(349, 71%, 52%), hsl(349, 70%, 56%))',
            lizardGradient: 'linear-gradient(hsl(261, 73%, 60%), hsl(261, 72%, 63%))',
            cyan: 'linear-gradient(hsl(189, 59%, 53%), hsl(189, 58%, 57%))',

            // Neutral 
            darkText: 'hsl(229, 25%, 31%)',
            scoreText: 'hsl(229, 64%, 46%)',
            headerOutline: 'hsl(217, 16%, 45%)',
            white: 'hsl(0, 0%, 100%)',

            // Background
            radialGradient: 'radial-gradient(hsl(214, 47%, 23%), hsl(237, 49%, 15%))'
        },

        // Fonts

        // Family: [Barlow Semi Condensed](https://fonts.google.com/specimen/Barlow+Semi+Condensed)
        // Weights: 600, 700
        font: {
            family: "'Barlow Semi Condensed', sans-serif",
            weights: {
                semibold: 600,
                bold: 700
            }
        }

    };

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}