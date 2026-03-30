import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        BrowserHistory browser = new BrowserHistory();

        printWelcome();
        loadDemoData(browser);

        boolean running = true;
        while (running) {
            printMenu();
            System.out.print("  Enter command: ");
            String input = scanner.nextLine().trim().toUpperCase();

            switch (input) {

                case "VISIT":
                    System.out.print("  Enter URL   : ");
                    String url = scanner.nextLine().trim();
                    System.out.print("  Enter Title : ");
                    String title = scanner.nextLine().trim();
                    browser.visit(url, title);
                    break;

                case "BACK":
                    browser.goBack();
                    break;

                case "FORWARD":
                    browser.goForward();
                    break;

                case "SHOW_HISTORY":
                    browser.showHistory();
                    break;

                case "DELETE_PAGE":
                    System.out.print("  Enter URL to delete: ");
                    browser.deletePage(scanner.nextLine().trim());
                    break;

                case "BOOKMARK":
                    browser.toggleBookmark();
                    break;

                case "SHOW_BOOKMARKS":
                    browser.showBookmarks();
                    break;

                case "INCOGNITO":
                    browser.toggleIncognito();
                    break;

                case "CLEAR":
                    browser.clearHistory();
                    break;

                case "STATS":
                    browser.showStats();
                    break;

                case "EXIT":
                    System.out.println("\n  Browser closed. Goodbye!\n");
                    running = false;
                    break;

                default:
                    System.out.println("  [!] Unknown command.");
            }
        }
        scanner.close();
    }

    private static void loadDemoData(BrowserHistory browser) {
        System.out.println("  Loading demo browsing session...\n");
        browser.visit("google.com",   "Google Search");
        browser.visit("youtube.com",  "YouTube");
        browser.visit("github.com",   "GitHub");
        browser.visit("facebook.com", "Facebook");
        browser.visit("gmail.com",    "Gmail");
        System.out.println("\n  [✓] Demo loaded! Currently on: gmail.com");
        System.out.println("  Try: BACK → BACK → FORWARD → BOOKMARK → STATS");
        System.out.println("  ─────────────────────────────────────────────\n");
    }

    private static void printWelcome() {
        System.out.println();
        System.out.println("  ╔══════════════════════════════════════════════╗");
        System.out.println("  ║        BROWSER HISTORY MANAGER               ║");
        System.out.println("  ║     Using Doubly Linked List — Java          ║");
        System.out.println("  ╚══════════════════════════════════════════════╝");
        System.out.println();
    }

    private static void printMenu() {
        System.out.println("  ───────────────────────────────────────────");
        System.out.println("  VISIT          → Open a new page");
        System.out.println("  BACK           → Go to previous page  (◀)");
        System.out.println("  FORWARD        → Go to next page      (▶)");
        System.out.println("  SHOW_HISTORY   → Display full history");
        System.out.println("  DELETE_PAGE    → Remove a page");
        System.out.println("  BOOKMARK       → Bookmark current page");
        System.out.println("  SHOW_BOOKMARKS → List all bookmarks");
        System.out.println("  INCOGNITO      → Toggle private mode");
        System.out.println("  STATS          → View statistics");
        System.out.println("  CLEAR          → Clear all history");
        System.out.println("  EXIT");
        System.out.println("  ───────────────────────────────────────────");
    }
}

