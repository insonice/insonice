module.exports = [
  {
    name: "insonice-api", // Name of your application
    watch: true,
    cwd: './apps/api',
    watch_delay: 1000, // 可选，延迟时间（毫秒）
    script: "bun run start", // Entry point of your application
    ignore_watch: ['node_modules', 'logs'], // 可选，忽略的目录或文件
    env: {
      BUN_ENV: 'production',
    },
  },
  {
    name: "insonice-web", // Name of your application
    cwd: './apps/web',
    script: "bun run start", // Entry point of your application
    env: {
      BUN_ENV: 'production',
    },
  },
];