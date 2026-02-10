import { login } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-accent/50">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="clay-card inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 bg-gradient-to-r from-sky-400 via-mint-400 to-coral-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-500 via-mint-500 to-coral-400 bg-clip-text text-transparent">
            管理员登录
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            请输入您的凭据以管理博客
          </p>
        </div>
        <div className="clay-card p-8 animate-fade-in animation-delay-100">
          <form className="space-y-6" action={login}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-foreground mb-2">
                  邮箱地址
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="clay-input w-full px-4 py-3 text-foreground placeholder-muted-foreground"
                  placeholder="请输入邮箱地址"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  密码
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="clay-input w-full px-4 py-3 text-foreground placeholder-muted-foreground"
                  placeholder="请输入密码"
                />
              </div>
            </div>

            {error && (
              <div className="clay-card p-4 bg-gradient-to-r from-red-100 to-pink-100 animate-fade-in">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="clay-button primary w-full py-4 text-sm font-medium transition-all duration-300 hover:scale-105 animate-fade-in animation-delay-200"
              >
                登录
              </button>
            </div>
          </form>
        </div>
        <div className="text-center text-sm text-muted-foreground animate-fade-in animation-delay-300">
          <p>登录后即可管理您的博客内容</p>
        </div>
      </div>
    </div>
  )
}
