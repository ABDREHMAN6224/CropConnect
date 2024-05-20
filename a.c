#include <stdio.h>

int main() {
    FILE *fp;
    char buffer[1000];
    // Model and Manufacturer
    fp = popen("cat /proc/cpuinfo | grep 'model name' | uniq", "r");
    while (fgets(buffer, sizeof(buffer), fp) != NULL) {
        printf("%s", buffer);
    }
    pclose(fp);
    // Kernel version
    fp = popen("cat /proc/version", "r");
    printf("Kernel version: ");
    while (fgets(buffer, sizeof(buffer), fp) != NULL) {
        printf("%s", buffer);
    }
    pclose(fp);
    // Time since last boot
    fp = popen("cat /proc/uptime", "r");
    printf("Time since last boot: ");
    while (fgets(buffer, sizeof(buffer), fp) != NULL) {
        printf("%s", buffer);
    }
    pclose(fp);

    // Time processor has spent in user mode, system mode, and idle time
    fp = popen("cat /proc/stat | grep 'cpu '", "r");
    printf("Time processor has spent in user mode, system mode, and idle time: ");
    while (fgets(buffer, sizeof(buffer), fp) != NULL) {
        printf("%s", buffer);
    }
    pclose(fp);

    // Memory configured for this computer
    fp = popen("cat /proc/meminfo | grep 'MemTotal'", "r");
    while (fgets(buffer, sizeof(buffer), fp) != NULL) {
        printf("%s", buffer);
    }
    pclose(fp);

    // Memory currently available
    fp = popen("cat /proc/meminfo | grep 'MemAvailable'", "r");
    while (fgets(buffer, sizeof(buffer), fp) != NULL) {
        printf("%s", buffer);
    }
    pclose(fp);
    return 0;
}