export function getLevelName(level: number): string {
  // console.log(level)
  const [l, r] = [Math.floor(level / 10), level % 10]
  let levelName = ''
  switch (l) {
    case 1: {
      levelName += '一级'
      break
    }
    case 2: {
      levelName += '二级'
      break
    }
    case 3: {
      levelName += '三级'
      break
    }
  }

  switch (r) {
    case 1: {
      levelName += '甲等'
      break
    }
    case 2: {
      levelName += '乙等'
      break
    }
    case 3: {
      levelName += '丙等'
      break
    }
  }
  if (levelName == '') {
    levelName = '未知等级'
  }
  return levelName
}
