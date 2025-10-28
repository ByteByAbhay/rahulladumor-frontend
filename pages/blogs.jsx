import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MainLayout from "../components/ui/MainLayout";
import MetaHead from "../components/MetaHead";
import Icon from "../components/AppIcon";
import Image from "../components/AppImage";
import api from "../utils/api/api";
import { personalInfo as localPersonalInfo, seo as localSeo, pageSEO } from "../config/personalInfo";

const BlogsPage = ({ profileData }) => {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTag, setSelectedTag] = useState("javascript");
  const [searchQuery, setSearchQuery] = useState("");

  const blogsPerPage = 12;
  const availableTags = [
    "javascript",
    "react",
    "nextjs",
    "typescript",
    "webdev",
    "aws",
    "devops",
  ];

  // Fetch blogs with pagination
  const fetchBlogs = async (page = 1, tag = "javascript", search = "") => {
    try {
      setLoading(true);
      const response = await api.get("/api/articles", {
        params: {
          page,
          per_page: blogsPerPage,
          tag,
          state: "fresh",
          top: 7,
          ...(search && { search }),
        },
      });

      if (response.status === "success" && response.data) {
        setBlogs(response.data);
        setTotalPages(response.pagination?.has_next_page ? page + 1 : page);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage, selectedTag, searchQuery);
  }, [currentPage, selectedTag, searchQuery]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTagChange = (tag) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchBlogs(1, selectedTag, searchQuery);
  };

  // Merge page-specific SEO with global verification codes
  const seo = {
    ...pageSEO.blogs,
    googleVerification: localSeo.googleVerification,
    bingVerification: localSeo.bingVerification,
    pinterestVerification: localSeo.pinterestVerification,
  };

  return (
    <MainLayout profileData={profileData}>
      <MetaHead seo={seo} />

      {/* Hero Section */}
      <section id="about" className="py-20 bg-surface">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 md:mb-6 px-4">
            Tech Articles & Insights
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto px-4">
            Discover the latest trends, tutorials, and insights from the tech
            community. Stay updated with trends in JavaScript, React, AWS, and
            more.
          </p>
        </div>

        {/* Filters Section */}
        {/* <section className="py-8 bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-text-secondary font-medium">Filter by topic:</span>
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagChange(tag)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedTag === tag
                    ? 'bg-accent text-white shadow-lg'
                    : 'bg-white text-primary border border-border hover:border-accent hover:text-accent'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </section> */}

        {/* Articles Grid */}
        <section className="bg-surface">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {loading ? (
              // Loading skeleton
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(blogsPerPage)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200 rounded-xl h-48 mb-4"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : blogs.length > 0 ? (
              <>
                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {blogs.map((blog) => (
                    <a
                      key={blog.id}
                      href={blog.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Read article: ${blog.title}`}
                      className="bg-white rounded-xl shadow-lg border border-border hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer block"
                    >
                      {/* Blog cover image */}
                      <div className="relative h-48 overflow-hidden">
                        {blog.cover_image ? (
                          <Image
                            src={blog.cover_image}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                            <Icon name="FileText" size={48} color="white" />
                          </div>
                        )}
                        <div className="absolute top-4 right-4">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-primary">
                            {blog.reading_time_minutes} min read
                          </div>
                        </div>
                      </div>

                      {/* Blog content */}
                      <div className="p-6">
                        {/* Author info */}
                        <div className="flex items-center space-x-3 mb-4">
                          <Image
                            src={blog.user.profile_image_90}
                            alt={blog.user.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="text-sm font-medium text-primary">
                              {blog.user.name}
                            </p>
                            <p className="text-xs text-text-secondary">
                              {blog.readable_publish_date}
                            </p>
                          </div>
                        </div>

                        {/* Blog title */}
                        <h3 className="font-bold text-lg text-primary mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                          {blog.title}
                        </h3>

                        {/* Blog description */}
                        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                          {blog.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {blog.tag_list.slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="bg-surface text-primary text-xs px-2 py-1 rounded-full font-medium"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Engagement metrics */}
                        <div className="flex items-center justify-between text-xs text-text-secondary">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Icon name="Heart" size={14} />
                              <span>{blog.positive_reactions_count}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Icon name="MessageCircle" size={14} />
                              <span>{blog.comments_count}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 text-accent">
                            <span>Read more</span>
                            <Icon name="ExternalLink" size={12} />
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center space-x-4">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-primary border border-border hover:border-accent hover:text-accent"
                    }`}
                  >
                    <Icon name="ChevronLeft" size={16} />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                      const pageNum =
                        currentPage <= 3 ? index + 1 : currentPage - 2 + index;
                      if (pageNum > totalPages) return null;

                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                            currentPage === pageNum
                              ? "bg-accent text-white"
                              : "bg-white text-primary border border-border hover:border-accent hover:text-accent"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      currentPage >= totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-primary border border-border hover:border-accent hover:text-accent"
                    }`}
                  >
                    <span>Next</span>
                    <Icon name="ChevronRight" size={16} />
                  </button>
                </div>
              </>
            ) : (
              // No articles found
              <div className="text-center py-16">
                <Icon
                  name="FileText"
                  size={64}
                  color="#9CA3AF"
                  className="mx-auto mb-6"
                />
                <h3 className="text-2xl font-bold text-primary mb-4">
                  No Articles Found
                </h3>
                <p className="text-text-secondary mb-8">
                  {searchQuery
                    ? `No articles found for "${searchQuery}". Try a different search term.`
                    : `No articles found for the selected topic. Try a different filter.`}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTag("javascript");
                    setCurrentPage(1);
                  }}
                  className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </section>
    </MainLayout>
  );
};

export async function getStaticProps() {
  try {
    // You can fetch profile data here if needed
    return {
      props: {
        profileData: localPersonalInfo,
      },
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        profileData: localPersonalInfo,
      },
    };
  }
}

export default BlogsPage;
