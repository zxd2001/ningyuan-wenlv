import raw from './ningyuanpinghua.csv?raw'

const lines = raw.trim().split('\n')
const header = lines[0].split(',').map(h => h.trim())

export const allDialectWords = lines.slice(1).map(line => {
  const values = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      inQuotes = !inQuotes
    } else if (ch === ',' && !inQuotes) {
      values.push(current.trim())
      current = ''
    } else {
      current += ch
    }
  }
  values.push(current.trim())

  const obj = {}
  header.forEach((h, i) => { obj[h] = values[i] || '' })
  return obj
}).filter(w => w.word && w.iid)

// iid 前两位数字对应分类
const CAT_MAP = {
  '00': '天文地理',
  '01': '天文地理',
  '02': '天文地理',
  '03': '时间方位',
  '04': '时间方位',
  '05': '时间方位',
  '06': '人物称谓',
  '07': '动作身体',
  '08': '动作身体',
  '09': '动物植物',
  '10': '动物植物',
  '11': '日常生活',
  '12': '饮食烹饪',
  '13': '饮食烹饪',
  '14': '日常生活',
  '15': '日常生活',
  '16': '其他',
}

export function getCatFromIid(iid) {
  const prefix = (iid || '').slice(0, 2)
  return CAT_MAP[prefix] || '其他'
}

export const CATEGORIES = [
  { id: '天文地理', label: '天文地理' },
  { id: '时间方位', label: '时间方位' },
  { id: '人物称谓', label: '人物称谓' },
  { id: '动作身体', label: '动作身体' },
  { id: '动物植物', label: '动物植物' },
  { id: '日常生活', label: '日常生活' },
  { id: '饮食烹饪', label: '饮食烹饪' },
]

export function filterWords(keyword, categoryId) {
  const kw = keyword.trim().toLowerCase()
  return allDialectWords.filter(w => {
    const cat = getCatFromIid(w.iid)
    const inCat = categoryId === 'all' || cat === categoryId
    if (!kw) return inCat
    return (
      (w.word && w.word.toLowerCase().includes(kw)) ||
      (w.dialect && w.dialect.toLowerCase().includes(kw)) ||
      (w.mandarin && w.mandarin.toLowerCase().includes(kw)) ||
      (w.english && w.english.toLowerCase().includes(kw)) ||
      (w.phonetic && w.phonetic.toLowerCase().includes(kw))
    ) && inCat
  })
}

