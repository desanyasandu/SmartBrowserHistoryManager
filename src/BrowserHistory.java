public class BrowserHistory {

    private Page head;
    private Page current;
    private boolean incognitoMode;
    private int totalVisits;

    public BrowserHistory() {
        this.head = null;
        this.current = null;
        this.incognitoMode = false;
        this.totalVisits = 0;
    }


    public void visit(String url, String title) {

        if (incognitoMode) {
            System.out.println("  [Incognito] Visiting: " + url);
            System.out.println("  [Incognito] Page will NOT be saved to history.");
            return;
        }

        if (current != null && current.next != null) {
            current.next.prev = null;
            current.next = null;
            System.out.println("  [i] Forward history cleared.");
        }

        Page existing = findPage(url);
        if (existing != null) {
            existing.visitCount++;
            removePage(existing);
            appendPage(existing);
            current = existing;
            System.out.println("  [✓] Revisited: " + existing);
            totalVisits++;
            return;
        }

        Page newPage = new Page(url, title);
        appendPage(newPage);
        current = newPage;
        totalVisits++;
        System.out.println("  [✓] Visited: " + newPage);
    }

   
    public void goBack() {
        if (current == null) {
            System.out.println("  [!] No history yet.");
            return;
        }
        if (current.prev == null) {
            System.out.println("  [!] No previous page. You are at the beginning.");
            return;
        }
        current = current.prev;
        System.out.println("  [◀ BACK] Now viewing: " + current);
    }

    public void goForward() {
        if (current == null) {
            System.out.println("  [!] No history yet.");
            return;
        }
        if (current.next == null) {
            System.out.println("  [!] No forward page. You are at the latest.");
            return;
        }
        current = current.next;
        System.out.println("  [▶ FORWARD] Now viewing: " + current);
    }

   
    public void showHistory() {
        if (head == null) {
            System.out.println("  [!] History is empty.");
            return;
        }

        System.out.println("\n  ════ BROWSER HISTORY (Oldest → Newest) ════");
        Page temp = head;
        int index = 1;
        while (temp != null) {
            String marker = (temp == current) ? "  ► " : "    ";
            System.out.println(marker + index + ". " + temp);
            temp = temp.next;
            index++;
        }

        System.out.println("\n  ════ REVERSE (Newest → Oldest) ════");
        Page tail = current;
        while (tail.next != null)
            tail = tail.next;
        index = 1;
        temp = tail;
        while (temp != null) {
            String marker = (temp == current) ? "  ► " : "    ";
            System.out.println(marker + index + ". " + temp);
            temp = temp.prev;
            index++;
        }
        System.out.println();
    }

  
    public void deletePage(String url) {
        Page target = findPage(url);
        if (target == null) {
            System.out.println("  [!] URL not found: " + url);
            return;
        }
        if (target == current) {
            if (current.prev != null)
                current = current.prev;
            else if (current.next != null)
                current = current.next;
            else
                current = null;
        }
        removePage(target);
        System.out.println("  [✓] Deleted: " + url);
    }

    public void toggleBookmark() {
        if (current == null) {
            System.out.println("  [!] No page currently open.");
            return;
        }
        current.isBookmarked = !current.isBookmarked;
        if (current.isBookmarked)
            System.out.println("  [★] Bookmarked: " + current.url);
        else
            System.out.println("  [☆] Bookmark removed: " + current.url);
    }

    public void showBookmarks() {
        System.out.println("\n  ════ BOOKMARKS ════");
        Page temp = head;
        int count = 0;
        while (temp != null) {
            if (temp.isBookmarked) {
                System.out.println("  ★ " + temp);
                count++;
            }
            temp = temp.next;
        }
        if (count == 0)
            System.out.println("  No bookmarks saved.");
        System.out.println();
    }


    public void toggleIncognito() {
        incognitoMode = !incognitoMode;
        if (incognitoMode)
            System.out.println("  [🔒 Incognito ON]  Pages will NOT be saved.");
        else
            System.out.println("  [🔓 Incognito OFF] History recording resumed.");
    }

    public void clearHistory() {
        head = null;
        current = null;
        totalVisits = 0;
        System.out.println("  [✓] History cleared.");
    }

    public void showStats() {
        if (head == null) {
            System.out.println("  [!] No history.");
            return;
        }
        System.out.println("\n  ════ STATISTICS ════");
        System.out.println("  Total visits    : " + totalVisits);
        System.out.println("  Incognito mode  : " + (incognitoMode ? "ON" : "OFF"));
        System.out.println("  Current page    : " + (current != null ? current.url : "None"));

        Page temp = head;
        Page mostVisited = head;
        int bookmarkCount = 0;
        while (temp != null) {
            if (temp.visitCount > mostVisited.visitCount)
                mostVisited = temp;
            if (temp.isBookmarked)
                bookmarkCount++;
            temp = temp.next;
        }
        System.out.println("  Most visited    : " + mostVisited.url
                + " (" + mostVisited.visitCount + " visits)");
        System.out.println("  Total bookmarks : " + bookmarkCount);
        System.out.println();
    }

    private void appendPage(Page page) {
        if (head == null) {
            head = page;
            page.prev = null;
            page.next = null;
        } else {
            Page tail = head;
            while (tail.next != null)
                tail = tail.next;
            tail.next = page;
            page.prev = tail;
            page.next = null;
        }
    }

    private void removePage(Page page) {
        if (page.prev != null)
            page.prev.next = page.next;
        else
            head = page.next;
        if (page.next != null)
            page.next.prev = page.prev;
        page.prev = null;
        page.next = null;
    }

    private Page findPage(String url) {
        Page temp = head;
        while (temp != null) {
            if (temp.url.equalsIgnoreCase(url))
                return temp;
            temp = temp.next;
        }
        return null;
    }
}