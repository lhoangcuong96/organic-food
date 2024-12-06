"use client"; // Đảm bảo đây là một client component

class SessionStore {
  private static instance: SessionStore | null = null;

  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  public static getInstance(): SessionStore {
    if (this.instance === null) {
      this.instance = new SessionStore();
      if (typeof window !== "undefined") {
        // Chỉ gọi localStorage khi đang ở client
        this.instance.loadTokens();
      }
    }
    return this.instance;
  }

  private loadTokens(): void {
    this.accessToken = localStorage.getItem("accessToken");
    this.refreshToken = localStorage.getItem("refreshToken");
  }

  public setTokens(accessToken: string, refreshToken: string): void {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }

  public getAccessToken(): string | null {
    return this.accessToken;
  }

  public getRefreshToken(): string | null {
    return this.refreshToken;
  }

  public clearTokens(): void {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
}

export default SessionStore.getInstance();
