"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("邮箱或密码不正确");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      setError("登录过程中出现错误");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-md mx-auto py-16">
      <div className="card p-8">
        <h1 className="text-2xl font-bold text-center mb-6">登录</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              邮箱
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
              placeholder="请输入邮箱"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              密码
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
              placeholder="请输入密码"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[color:var(--primary)] focus:ring-[color:var(--primary)]"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm">
                记住我
              </label>
            </div>
            <div className="text-sm">
              <Link href="/forgot-password" className="text-[color:var(--primary)] hover:underline">
                忘记密码?
              </Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "登录中..." : "登录"}
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm">
            还没有账号?{" "}
            <Link href="/register" className="text-[color:var(--primary)] hover:underline">
              立即注册
            </Link>
          </p>
        </div>
        <div className="mt-6">
          <p className="text-xs text-center text-gray-500">
            提示: 使用 test@example.com / password123 登录测试账号
          </p>
        </div>
      </div>
    </div>
  );
}