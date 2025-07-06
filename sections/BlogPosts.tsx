import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { ComponentChildren, Fragment } from "preact";
import { BlogPost } from "apps/blog/types.ts";
import { useId } from "../sdk/useId.ts";
import { usePartialSection } from "@deco/deco/hooks";
export interface CTA {
    text?: string;
}
/** @title {{{title}}} */
export interface Post {
    url?: string;
    title?: string;
    author?: string;
    excerpt?: string;
    image?: ImageWidget;
    date?: string;
    readingTime?: string;
    tags?: string[];
}
export interface Props {
    cta?: CTA;
    posts?: BlogPost[] | null;
    pagination?: {
        /**
         * @title First page
         * @description Leave it as 0 to start from the first page
         */
        page?: number;
        /** @title items per page */
        perPage?: number;
    };
}
const DEFAULT_IMAGE = "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4763/682eb374-def2-4e85-a45d-b3a7ff8a31a9";
function Container({ children }: {
    children: ComponentChildren;
}) {
    return (<div class="container lg:mx-auto lg:py-14 mx-2 py-12 text-sm">
      <div class="space-y-16">{children}</div>
    </div>);
}

function YearSection({ year, children }: { year: string; children: ComponentChildren }) {
    return (
        <div class="space-y-8">
            <div class="text-center">
                <h2 class="text-5xl md:text-6xl font-light text-gray-800 tracking-wide mb-4">
                    {year}
                </h2>
                <div class="w-24 h-px bg-gray-300 mx-auto"></div>
            </div>
            {children}
        </div>
    );
}

export default function BlogPosts({ cta = { text: "Show more" }, posts = [], pagination: { page = 0, perPage = 6, } = {}, }: Props) {
    const from = perPage * page;
    const to = perPage * (page + 1);
    // It's boring to generate ids. Let's autogen them
    const postList = useId();
    // Get the HTMX link for this section
    const fetchMoreLink = usePartialSection({
        mode: "append",
        // Renders this section with the next page
        props: {
            pagination: { perPage, page: page + 1 },
        },
    })["f-partial"];
    function calculateReadingTime(words: number): string {
        const wordsPerMinute = 250;
        const estimatedTimeMinutes = words / wordsPerMinute;
        const roundedReadingTime = Math.round(estimatedTimeMinutes);
        return `${roundedReadingTime} min`;
    }
    
    // Group posts by year
    const groupedPosts = posts?.reduce((acc: { [key: string]: BlogPost[] }, post) => {
        if (!post.date) return acc;
        const year = new Date(post.date).getFullYear().toString();
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(post);
        return acc;
    }, {}) || {};
    
    // Sort years in descending order
    const sortedYears = Object.keys(groupedPosts).sort((a, b) => parseInt(b) - parseInt(a));
    
    // Add 2025 to the top if it doesn't exist
    const years = sortedYears.includes('2025') ? sortedYears : ['2025', ...sortedYears];
    
    const ContainerComponent = page === 0 ? Container : Fragment;
    
    return (<ContainerComponent>
      <>
        {years.map((year) => {
            const yearPosts = groupedPosts[year] || [];
            const displayPosts = yearPosts.slice(from, to);
            
            return (
                <YearSection key={year} year={year}>
                    {year === '2025' && yearPosts.length === 0 ? (
                        <div class="text-center py-8">
                            <p class="text-gray-500 text-lg italic">
                                Em breve, novos artigos...
                            </p>
                        </div>
                    ) : (
                        <div class="gap-8 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
                            {displayPosts.map((post) => (
                                <a href={`/blog/${post.slug}`} class="border border-secondary overflow-hidden rounded-lg flex flex-col hover:shadow-lg transition-shadow duration-200">
                                    <Image width={380} height={274} class="object-cover w-full" sizes="(max-width: 640px) 100vw, 30vw" src={post.image || ""} alt={post.image} decoding="async" loading="lazy" id={post.slug}/>
                                    <div class="p-6 space-y-4 flex flex-col flex-1">
                                        <div class="font-semibold text-gray-600">{calculateReadingTime(post.content.split(" ").length)}</div>
                                        <div class="space-y-2 flex-1">
                                            <h3 class="text-2xl font-medium text-gray-900 leading-tight" id={`title-${post.slug}`}>{post.title}</h3>
                                            {post.excerpt?.length > 5 && <p class="text-base text-gray-600 line-clamp-3">{post.excerpt}</p>}
                                        </div>
                                        <div class="flex flex-wrap gap-2">
                                            {post.categories?.map((category) => (
                                                <div class="badge badge-lg badge-primary text-xs">
                                                    {category.name}
                                                </div>
                                            ))}
                                        </div>
                                        <div class="flex flex-wrap gap-2 text-sm text-gray-500">
                                            <span>{post.date
                                                ? new Date(post.date).toLocaleDateString("pt-BR", {
                                                    month: "long",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })
                                                : ""}</span>
                                            <span>•</span>
                                            <span>{post.authors[0]?.name}</span>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}
                </YearSection>
            );
        })}
        {to < (posts?.length || 1000) && (<div class="flex justify-center w-full mt-12" id={postList}>
            <button hx-get={fetchMoreLink} hx-swap="outerHTML" hx-target={`#${postList}`} aria-label={cta.text} class="btn btn-primary px-8 py-3 text-base">
                <span class="inline [.htmx-request_&]:hidden">
                    {cta.text}
                </span>
                <span class="loading loading-spinner hidden [.htmx-request_&]:block"/>
            </button>
        </div>)}
      </>
    </ContainerComponent>);
}
