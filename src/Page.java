public class Page {
    String url;
    String title;
    int visitCount;
    boolean isBookmarked;

    Page prev;
    Page next;

    public Page(String url, String title) {
        this.url = url;
        this.title = title;
        this.visitCount = 1;
        this.isBookmarked = false;
        this.prev = null;
        this.next = null;
    }

    @Override
    public String toString() {
        String bookmark = isBookmarked ? " ★" : "";
        return "[" + title + "] " + url + " (Visits: " + visitCount + ")" + bookmark;
    }
}