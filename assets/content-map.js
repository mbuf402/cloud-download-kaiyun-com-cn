const contentSections = {
  home: { id: "home", label: "首页", tags: ["开云", "体育", "电竞"] },
  sports: { id: "sports", label: "体育赛事", tags: ["开云", "足球", "篮球", "网球"] },
  esports: { id: "esports", label: "电竞赛事", tags: ["开云", "英雄联盟", "DOTA2", "CSGO"] },
  casino: { id: "casino", label: "娱乐场", tags: ["开云", "真人", "老虎机", "扑克"] },
  about: { id: "about", label: "关于我们", tags: ["开云", "公司", "联系"] }
};

const categoryKeywords = {
  "开云": ["云下载", "开云官网", "开云平台"],
  "体育": ["直播", "比分", "投注"],
  "电竞": ["赛事", "战队", "竞猜"],
  "娱乐": ["真人", "游戏", "大奖"]
};

const externalLinks = {
  official: "https://www.cloud-download-kaiyun.com.cn",
  support: "https://www.cloud-download-kaiyun.com.cn/support",
  terms: "https://www.cloud-download-kaiyun.com.cn/terms"
};

function searchContent(query) {
  if (!query || query.trim() === "") {
    return { result: [], count: 0 };
  }

  const lowerQuery = query.toLowerCase().trim();
  const matchedSections = [];
  const matchedCategories = [];
  const matchedLinks = [];

  for (const [sectionId, section] of Object.entries(contentSections)) {
    const tagMatch = section.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
    const labelMatch = section.label.toLowerCase().includes(lowerQuery);
    const idMatch = section.id.includes(lowerQuery);
    if (tagMatch || labelMatch || idMatch) {
      matchedSections.push(section);
    }
  }

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (category.toLowerCase().includes(lowerQuery)) {
      matchedCategories.push({ category, keywords });
    } else {
      const kwMatch = keywords.filter(kw => kw.toLowerCase().includes(lowerQuery));
      if (kwMatch.length > 0) {
        matchedCategories.push({ category, keywords: kwMatch });
      }
    }
  }

  for (const [linkType, url] of Object.entries(externalLinks)) {
    if (url.toLowerCase().includes(lowerQuery) || linkType.toLowerCase().includes(lowerQuery)) {
      matchedLinks.push({ type: linkType, url });
    }
  }

  return {
    result: {
      sections: matchedSections,
      categories: matchedCategories,
      links: matchedLinks
    },
    count: matchedSections.length + matchedCategories.length + matchedLinks.length
  };
}

function getSectionById(sectionId) {
  return contentSections[sectionId] || null;
}

function getAllTags() {
  const allTags = new Set();
  for (const section of Object.values(contentSections)) {
    section.tags.forEach(tag => allTags.add(tag));
  }
  return Array.from(allTags);
}

function getKeywordsForCategory(categoryName) {
  return categoryKeywords[categoryName] || [];
}

function getExternalLink(type) {
  return externalLinks[type] || null;
}

function generateSiteMap() {
  const siteMap = [];
  for (const [id, section] of Object.entries(contentSections)) {
    siteMap.push({
      id: id,
      label: section.label,
      url: externalLinks.official + "/" + id,
      tags: section.tags
    });
  }
  return siteMap;
}

const testQueries = ["开云", "体育", "电竞", "英雄联盟", "支持", "公司", "未知"];
for (const q of testQueries) {
  const res = searchContent(q);
  console.log(`查询 "${q}": 找到 ${res.count} 个结果`);
}

console.log("站点地图:", JSON.stringify(generateSiteMap(), null, 2));