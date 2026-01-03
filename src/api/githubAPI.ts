import Http from '@/utils/request'

// GitHub API 接口
class GithubAPI {
  // 获取指定用户的贡献统计数据
  static getContributions(username: string, year?: number) {
    return Http.get(`/github/contributions/${username}`, {
      year
    })
  }
}

export default GithubAPI