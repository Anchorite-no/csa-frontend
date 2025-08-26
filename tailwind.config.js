/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
    darkMode: 'class', // 启用class模式的暗色主题
    theme: {
        extend: {
            colors: {
                // 自定义颜色变量
                primary: {
                    light: '#1976d2',
                    dark: '#42a5f5'
                },
                background: {
                    light: '#ffffff',
                    dark: '#121212'
                },
                surface: {
                    light: '#f8f9fa',
                    dark: '#1e1e1e'
                },
                text: {
                    light: '#333333',
                    dark: '#ffffff'
                }
            }
        },
    },
    plugins: [],
}
