"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("两次输入的密码不一致");
      setLoading(false);
      return;
    }

    // 模拟注册成功
    setTimeout(() => {
      setLoading(false);
      router.push("/login?registered=true");
    }, 1500);
  };

  return (
    <div className="container max-w-md mx-auto py-16">
      <div className="card p-8">
        <h1 className="text-2xl font-bold text-center mb-6">注册账号</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              用户名
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              required
              placeholder="请输入用户名"
            />
          </div>
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
              minLength={6}
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium mb-1">
              确认密码
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input"
              required
              placeholder="请再次输入密码"
              minLength={6}
            />
          </div>
          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 text-[color:var(--primary)] focus:ring-[color:var(--primary)]"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm">
              我同意{" "}
              <Link href="/terms" className="text-[color:var(--primary)] hover:underline">
                服务条款
              </Link>{" "}
              和{" "}
              <Link href="/privacy" className="text-[color:var(--primary)] hover:underline">
                隐私政策
              </Link>
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "注册中..." : "注册"}
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm">
            已有账号?{" "}
            <Link href="/login" className="text-[color:var(--primary)] hover:underline">
              立即登录
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}