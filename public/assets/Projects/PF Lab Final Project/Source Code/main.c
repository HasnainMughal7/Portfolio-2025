#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <ctype.h>
#include <windows.h>
#include <conio.h>
#include <stdint.h> // For uint32_t
// Gemini API Key
const char* API_KEY = "AIzaSyDwF0iCAtKizP5E0JiEJWHuSRRhb-ocsB8";

const int SCREEN_WIDTH = 80;
const int SCREEN_HEIGHT = 25;

// --- DATA STRUCTURES ---
// Stack for Operators
typedef struct {
    char items[512];
    int top;
} CharStack;
// Stack for Operands
typedef struct {
    double items[512];
    int top;
} DoubleStack;

// --- UI & UTILITY FUNCTIONS ---
// Cursor Positioning
void gotoxy(int x, int y) {
    COORD coord;
    coord.X = x;
    coord.Y = y;
    SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE), coord);
}
// Color Changing
void setColor(int color) {
    SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), color);
}
// Input Function (Prevents Buffer)
void getLine(char* buffer, int size) {
    fflush(stdin);
    if (fgets(buffer, size, stdin) != NULL) {
        size_t len = strlen(buffer);
        if (len > 0 && buffer[len-1] == '\n') {
            buffer[len-1] = '\0';
        }
    }
}
// UI Header
void drawHeader(char* title) {
    system("cls");
    setColor(11); // Cyan
    printf("============================================================\n");
    printf("   ALL IN ONE CALCULATOR - %s\n", title);
    printf("============================================================\n");
    setColor(7); // White
}
// UI Box
void drawBox(int x, int y, int width, int height) {
    setColor(14); // Yellow
    gotoxy(x, y); printf("%c", 201); 
    for(int i=0; i<width; i++) printf("%c", 205);
    printf("%c", 187);
    for(int i=1; i<height; i++) {
        gotoxy(x, y+i); printf("%c", 186);
        gotoxy(x+width+1, y+i); printf("%c", 186);
    }
    gotoxy(x, y+height); printf("%c", 200);
    for(int i=0; i<width; i++) printf("%c", 205);
    printf("%c", 188); 
    setColor(7);
}

// --- SHUNTING YARD ALGORITHM ---
void pushChar(CharStack *s, char c)
{
    s->top++;
    s->items[s->top] = c;
}
char popChar(CharStack *s)
{
    s->top--;
    return s->items[(s->top +1)];
}
int isEmptyChar(CharStack *s)
{
    return s->top == -1;
}
char peekChar(CharStack *s)
{
    return s->items[s->top];
}
void pushDouble(DoubleStack *s, double val)
{
    s->top++;
    s->items[s->top] = val;
}
double popDouble(DoubleStack *s)
{
    s->top--;
    return s->items[(s->top+1)];
}
int precedence(char op) {
    if (op == '+' || op == '-') return 1;
    if (op == '*' || op == '/' || op == '%') return 2;
    if (op == '^') return 3;
    return 0;
}
// Evaluate Expression
double evaluateExpression(char* exp, double xVal) {
    char postfix[1024] = "";
    CharStack ops;
    ops.top = -1;
    int k = 0;

    for (int i = 0; exp[i] != '\0'; i++) {
        if (isdigit(exp[i]) || exp[i] == '.') {
            postfix[k++] = exp[i];
            if (!isdigit(exp[i+1]) && exp[i+1] != '.') postfix[k++] = ' ';
        }
        else if (tolower(exp[i]) == 'x') {
            postfix[k++] = 'x';
            postfix[k++] = ' ';
        }
        else if (exp[i] == '(') {
            pushChar(&ops, '(');
        } else if (exp[i] == ')') {
            while (!isEmptyChar(&ops) && peekChar(&ops) != '(') postfix[k++] = popChar(&ops);
            popChar(&ops);
        } else if (strchr("+-*/^%", exp[i])) {
            while (!isEmptyChar(&ops) && precedence(peekChar(&ops)) >= precedence(exp[i])) postfix[k++] = popChar(&ops);
            pushChar(&ops, exp[i]);
        }
    }
    while (!isEmptyChar(&ops)) postfix[k++] = popChar(&ops);
    postfix[k] = '\0';

    DoubleStack vals;
    vals.top = -1;
    for (int i = 0; postfix[i] != '\0'; i++) {
        if (isdigit(postfix[i])) {
            double num = 0;
            int decimal = 0;
            double divisor = 10.0;
            while (isdigit(postfix[i]) || postfix[i] == '.') {
                if(postfix[i] == '.')
                {
                    decimal = 1; 
                    i++;
                    continue;
                }
                if(!decimal) num = num * 10 + (postfix[i] - '0'); // Converting string to integer (ascii code of 0 = 48)
                else { num += (postfix[i] - '0') / divisor; divisor *= 10.0; }
                i++;
            }
            i--;
            pushDouble(&vals, num);
        }
        else if (postfix[i] == 'x') {
            pushDouble(&vals, xVal);
        }
        else if (strchr("+-*/^%", postfix[i])) {
            if(vals.top < 1) return 0;
            double val2 = popDouble(&vals);
            double val1 = popDouble(&vals);
            switch (postfix[i]) {
                case '+': pushDouble(&vals, val1 + val2);
                break;
                case '-': pushDouble(&vals, val1 - val2);
                break;
                case '*': pushDouble(&vals, val1 * val2);
                break;
                case '/': pushDouble(&vals, (val2 != 0 ? val1 / val2 : 0));
                break;
                case '^': pushDouble(&vals, pow(val1, val2));
                break;
            }
        }
    }
    return (vals.top == -1) ? 0 : popDouble(&vals);
}

// --- AI & FILE HELPERS ---
// Base64 Encoder
char* base64_encode(const unsigned char *data, size_t input_length, size_t *output_length) {
    static const char encoding_table[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    *output_length = 4 * ((input_length + 2) / 3);
    char *encoded_data = malloc(*output_length + 1);
    if (encoded_data == NULL) return NULL;
    for (size_t i = 0, j = 0; i < input_length;) {
        uint32_t octet_a = i < input_length ? (unsigned char)data[i++] : 0;
        uint32_t octet_b = i < input_length ? (unsigned char)data[i++] : 0;
        uint32_t octet_c = i < input_length ? (unsigned char)data[i++] : 0;
        uint32_t triple = (octet_a << 0x10) + (octet_b << 0x08) + octet_c;

        encoded_data[j++] = encoding_table[(triple >> 3 * 6) & 0x3F];
        encoded_data[j++] = encoding_table[(triple >> 2 * 6) & 0x3F];
        encoded_data[j++] = encoding_table[(triple >> 1 * 6) & 0x3F];
        encoded_data[j++] = encoding_table[(triple >> 0 * 6) & 0x3F];
    }
    for (int i = 0; i < (3 - input_length % 3) % 3; i++) encoded_data[*output_length - 1 - i] = '=';
    encoded_data[*output_length] = '\0';
    return encoded_data;
}
// Windows File Dialog
void selectFile(char* buffer) {
    OPENFILENAME ofn;
    ZeroMemory(&ofn, sizeof(ofn));
    ofn.lStructSize = sizeof(ofn);
    ofn.hwndOwner = NULL;
    ofn.lpstrFile = buffer;
    ofn.lpstrFile[0] = '\0';
    ofn.nMaxFile = 260;
    ofn.lpstrFilter = "Images\0*.jpg;*.png;*.jpeg\0All Files\0*.*\0";
    ofn.nFilterIndex = 1;
    ofn.Flags = OFN_PATHMUSTEXIST | OFN_FILEMUSTEXIST;
    GetOpenFileName(&ofn);
}

// --- MAIN MODE FUNCTIONS ---

void scientificMode() {
    char input[256];
    while(1) {
        drawHeader("SCIENTIFIC MODE");
        printf("Type equation (e.g. 5+5*2) or 'back':\n");
        drawBox(2, 4, 60, 3);
        gotoxy(4, 5);

        getLine(input, 256);
        if(strcmp(input, "back") == 0) break;
        if(strlen(input) == 0) continue;

        // Clean spaces
        char clean[256]; int j=0;
        for(int i=0; input[i]; i++) if(input[i]!=' ') clean[j++] = input[i];
        clean[j]='\0';

        double res = evaluateExpression(clean, 0);

        gotoxy(4, 6);
        setColor(10);
        printf("= %.4lf", res);
        setColor(7);

        gotoxy(0, 9);
        printf("Press any key...");
        getch();
    }
}

void graphingMode() {
    char input[256];
    while(1) {
        drawHeader("GRAPHING MODE");
        printf("Enter function of x (e.g. x*x or x+2) or 'back':\n");
        drawBox(2, 4, 50, 2);
        gotoxy(4, 5);

        getLine(input, 256);
        if(strcmp(input, "back") == 0) break;

        system("cls");
        drawHeader("GRAPHING OUTPUT");
        printf("Plotting: y = %s\n", input);

        for(int y = 10; y >= -10; y--) {
            for(int x = -30; x <= 30; x++) {
                double realX = (double)x / 2.0;
                double realY = evaluateExpression(input, realX);

                if (fabs(realY - (double)y) < 0.5) printf("*");
                else if (x == 0) printf("|");
                else if (y == 0) printf("-");
                else printf(" ");
            }
            printf("\n");
        }
        printf("\nPress key to back...");
        getch();
    }
}

void converterMode() {
    char buffer[50];
    while(1) {
        drawHeader("UNIT CONVERTER");
        printf("1. m to cm\n2. kg to lbs\n3. USD to PKR\n4. Back\n\nSelection: ");

        getLine(buffer, 50);
        int choice = (buffer[0] - '0');

        if(choice == 4 || strcmp(buffer, "back") == 0) break;

        printf("Enter Value: ");
        getLine(buffer, 50);
        double val = atof(buffer);

        printf("Result: ");
        setColor(10);
        if(choice == 1) printf("%.2lf cm", val*100);
        else if(choice == 2) printf("%.2lf lbs", val*2.204);
        else if(choice == 3) printf("%.2lf PKR", val*278.5);
        else printf("Invalid");
        setColor(7);

        printf("\n\nPress key to continue...");
        getch();
    }
}

// --- HTML RENDERER FUNCTION ---
void openInBrowser(char* content) {
    printf("\nGenerating formatted output in Browser...\n");

    FILE *f = fopen("ai_response.html", "w");
    if (!f)
    {
        printf("Error creating HTML file!\n");
        return;
    }

    fprintf(f, "<!DOCTYPE html><html><head><title>AI Response</title>");
    fprintf(f, "<meta charset='UTF-8'>");

    // --- GEMINI RESPONSE SYMBOLS ---
    fprintf(f, "<script>");
    fprintf(f, "window.MathJax = { tex: { inlineMath: [['$', '$'], ['\\\\(', '\\\\)']] } };");
    fprintf(f, "</script>");

    // Load MathJax Library
    fprintf(f, "<script id=\"MathJax-script\" async src=\"https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js\"></script>");

    // CSS
    fprintf(f, "<style>");
    fprintf(f, "body { font-family: 'Segoe UI', sans-serif; padding: 40px; background-color: #f4f4f4; }");
    fprintf(f, ".container { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); max-width: 900px; margin: auto; }");
    fprintf(f, "h2 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }");
    fprintf(f, ".content { font-size: 18px; line-height: 1.8; color: #2c3e50; }");
    fprintf(f, "code { background: #eee; padding: 2px 5px; border-radius: 4px; }");
    fprintf(f, "</style>");

    fprintf(f, "</head><body><div class='container'>");
    fprintf(f, "<h2>Gemini AI Analysis</h2>");
    fprintf(f, "<div class='content'>");

    // Content Processing: (Newlines to <br> | **text** to <b>text</b>)
    for (int i = 0; content[i] != '\0'; i++) {
        if (content[i] == '*' && content[i+1] == '*') {
            // fputc('*', f); 
            // fputc('*', f); 
            i++;
        }
        else if (content[i] == '\n') {
            fprintf(f, "<br>");
        } else {
            fputc(content[i], f);
        }
    }
    fprintf(f, "</div></div></body></html>");
    fclose(f);
    // Open in Browser
    system("start ai_response.html");
}
void aiMode() {
    char prompt[500];
    char imagePath[260] = "";

    while(1) {
        drawHeader("AI AGENT");
        printf("Commands: 'upload', 'back', or Type Question\n");
        drawBox(2, 5, 70, 4);

        if(strlen(imagePath) > 0) {
             gotoxy(4, 6); setColor(14);
             printf("[Img]: %s", strrchr(imagePath, '\\') ? strrchr(imagePath, '\\')+1 : imagePath);
             setColor(7);
        }
        gotoxy(4, 7); 
        printf("Query: "); 
        getLine(prompt, 500);

        if(strcmp(prompt, "back") == 0) break;
        if(strcmp(prompt, "upload") == 0)
        {
            selectFile(imagePath);
            continue;
        }
        if(strlen(API_KEY) < 10)
        {
            printf("\n[ERROR] API Key Missing!");
            getch();
            continue;
        }
        printf("\nThinking... (Please Wait)\n");

        // --- PREPARE JSON ---
        FILE *jsonFile = fopen("request.json", "w");
        fprintf(jsonFile, "{ \"contents\": [{ \"parts\": [ { \"text\": \"%s\" }", prompt);
        if (imagePath[0] != '\0') {
            FILE *imgFile = fopen(imagePath, "rb");
            if(imgFile) {
                fseek(imgFile, 0, SEEK_END);
                size_t sz = ftell(imgFile);
                fseek(imgFile, 0, SEEK_SET);
                unsigned char *buf = malloc(sz);
                fread(buf, 1, sz, imgFile);
                fclose(imgFile);
                size_t b64Len;
                char *b64 = base64_encode(buf, sz, &b64Len);
                fprintf(jsonFile, ", { \"inline_data\": { \"mime_type\": \"image/jpeg\", \"data\": \"%s\" } }", b64);
                free(buf);
                free(b64);
            }
        }
        fprintf(jsonFile, "] }] }");
        fclose(jsonFile);

        // --- CALL API (Gemini 2.5 flash) ---
        char command[1024];
        sprintf(command, "curl -s -X POST \"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=%s\" -H \"Content-Type: application/json\" -d @request.json > response.txt", API_KEY);
        system(command);

        // --- READ RESPONSE ---
        FILE *respFile = fopen("response.txt", "r");
        if (!respFile)
        {
            printf("\nNo Response.\n");
            continue;
        }
        fseek(respFile, 0, SEEK_END);
        long fsize = ftell(respFile);
        fseek(respFile, 0, SEEK_SET);
        char *respText = malloc(fsize + 1);
        fread(respText, 1, fsize, respFile);
        respText[fsize] = 0;
        fclose(respFile);

        // --- PARSE JSON TEXT ---
        char *cleanResponse = malloc(fsize + 1);
        char *start = strstr(respText, "\"text\": \"");
        int idx = 0;

        if(start) {
            start += 9;
            int escaped = 0;
            while(*start) {
                if(*start == '"' && !escaped) break;
                if(*start == '\\' && !escaped) { escaped = 1; }
                else {
                    if(escaped) {
                        if(*start == 'n') cleanResponse[idx++] = '\n';
                        else if(*start == 't') cleanResponse[idx++] = '\t';
                        else cleanResponse[idx++] = *start;
                        escaped = 0;
                    } else {
                        cleanResponse[idx++] = *start;
                    }
                }
                start++;
            }
        } else {
            strcpy(cleanResponse, "Error parsing or empty response.");
        }
        cleanResponse[idx] = '\0';

        // --- OUTPUT ---
        setColor(10);
        printf("\nSuccess! Opening detailed answer in Browser...\n");
        setColor(7);

        openInBrowser(cleanResponse);

        free(respText); 
        free(cleanResponse);
        remove("request.json"); 
        remove("response.txt");
        imagePath[0] = '\0';

        printf("Check your browser window.\nPress key to continue...");
        getch();
    }
}

// --- MAIN ---
int main() {
    SetConsoleTitle("ALL IN ONE CALCULATOR");
    char input[10];

    while(1) {
        drawHeader("MAIN MENU");
        drawBox(25, 6, 30, 10);
        gotoxy(27, 7); printf("1. Scientific Calculator");
        gotoxy(27, 9); printf("2. Unit Converter");
        gotoxy(27, 11); printf("3. Graphing Mode");
        gotoxy(27, 13); printf("4. AI Agent");
        gotoxy(27, 15); printf("5. Exit");
        gotoxy(25, 18); printf("Option: ");
        getLine(input, 10);
        int choice = atoi(input);

        switch(choice) {
            case 1: scientificMode();
            break;
            case 2: converterMode();
            break;
            case 3: graphingMode();
            break;
            case 4: aiMode();
            break;
            case 5: exit(0);
            default: printf("Invalid!"); getch();
        }
    }
    return 0;
}